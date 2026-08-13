"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const sdk = require("../src");
const { createRpcClient } = require("../src/rpc");

const declarations = fs.readFileSync(path.join(__dirname, "../src/index.d.ts"), "utf8");
  const manifestSchema = JSON.parse(fs.readFileSync(path.join(__dirname, "../schema/komari-plugin.schema.json"), "utf8"));

test("definePlugin installs Komari lifecycle hooks", () => {
  const definition = { load() {}, unload() {} };
  assert.equal(sdk.definePlugin(definition), definition);
  assert.equal(globalThis.load, definition.load);
  assert.equal(globalThis.unload, definition.unload);
});

test("public SDK APIs and manifest fields keep English editor descriptions", () => {
  for (const phrase of [
    "Installs the plugin lifecycle callbacks expected by Komari.",
    "Calls a declared Komari RPC method with typed parameters and result.",
    "Gets runtime metadata for one method.",
  ]) {
    assert.match(declarations, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(declarations, /(?:^|\r?\n)\s*\* ?([^\r\n]+)\r?\n\s*\* ?\1(?:\r?\n|$)/);
  assert.doesNotMatch(declarations, /[\u3400-\u9fff]/);
  assert.match(manifestSchema.description, /Komari plugin manifest/);
  assert.match(manifestSchema.properties.name.description, /Display name/);
  assert.match(manifestSchema.$defs.permissions.properties.allowSystemRPC.description, /system RPC/);
  assert.doesNotMatch(JSON.stringify(manifestSchema), /[\u3400-\u9fff]/);
});

test("package and RPC catalog versions distinguish SDK release from Komari compatibility", () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));
  const rpcCatalog = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/rpc-catalog.json"), "utf8"));
  assert.equal(packageJson.version, "1.4.3");
  assert.equal(packageJson.komariVersion, "1.4.x");
  assert.equal(rpcCatalog.komari, "1.4.x");
});

test("Node-compatible runtime globals are available to plugin TypeScript", () => {
  assert.match(declarations, /declare global\s*\{/);
  assert.match(declarations, /const __storageDir__: string;/);
  assert.match(declarations, /function require\(moduleName: string\): any;/);
});

test("jsonResponse writes JSON content", () => {
  const calls = [];
  const response = {
    statusCode: 0,
    setHeader(name, value) { calls.push(["header", name, value]); },
    end(value) { calls.push(["end", value]); },
  };
  sdk.jsonResponse(response, { ok: true }, 201);
  assert.equal(response.statusCode, 201);
  assert.deepEqual(calls, [
    ["header", "Content-Type", "application/json; charset=utf-8"],
    ["end", '{"ok":true}'],
  ]);
});

test("manifest validation catches server-incompatible values", () => {
  assert.deepEqual(sdk.validateManifest({ name: "Demo", short: "demo" }), []);
  assert.ok(sdk.validateManifest({ name: "Demo", short: "../demo" }).length > 0);
  assert.ok(sdk.validateManifest({ name: "Demo", short: "demo", pages: [{ title: "Page", type: "redirect", url: "https://example.com" }] }).length > 0);
});

test("manifest validation supports managed selector and textbox fields", () => {
  const configuration = {
    type: "managed",
    data: [
      { name: "Node group", type: "title" },
      { name: "<strong>Choose monitored items</strong>", type: "textbox" },
      { key: "nodes", name: "Nodes", type: "nodes", default: "[]" },
      { key: "tasks", name: "Ping tasks", type: "pingtasks", default: "[]" },
    ],
  };
  assert.deepEqual(
    sdk.validateManifest({ name: "Demo", short: "demo", configuration }),
    [],
  );
  assert.ok(
    sdk.validateManifest({
      name: "Demo",
      short: "demo",
      configuration: {
        type: "managed",
        data: [{ name: "Nodes", type: "nodes" }],
      },
    }).length > 0,
  );
});

test("rpc client forwards calls and checks the live method list", async () => {
  const calls = [];
  const server = {
    call(...args) {
      calls.push(args);
      if (args[0] === "rpc.methods") return Promise.resolve(["common:getNodes", "plugin:echo"]);
      if (args[0] === "rpc.help") return Promise.resolve({ name: args[1].method, returns: "string" });
      return Promise.resolve({ ok: true });
    },
  };
  const client = createRpcClient(() => server);

  assert.deepEqual(await client.call("plugin:echo", { value: 1 }, "extra"), { ok: true });
  assert.deepEqual(await client.methods(), ["common:getNodes", "plugin:echo"]);
  assert.equal(await client.has("plugin:echo"), true);
  assert.equal(await client.has("plugin:missing"), false);
  assert.deepEqual(await client.help("plugin:echo"), { name: "plugin:echo", returns: "string" });
  assert.deepEqual(calls, [
    ["plugin:echo", { value: 1 }, "extra"],
    ["rpc.methods", { internal: false }],
    ["rpc.methods", { internal: true }],
    ["rpc.methods", { internal: true }],
    ["rpc.help", { method: "plugin:echo" }],
  ]);
});
