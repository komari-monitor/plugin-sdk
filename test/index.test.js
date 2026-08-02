"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const sdk = require("../src");
const { createRpcClient } = require("../src/rpc");

test("definePlugin installs Komari lifecycle hooks", () => {
  const definition = { load() {}, unload() {} };
  assert.equal(sdk.definePlugin(definition), definition);
  assert.equal(globalThis.load, definition.load);
  assert.equal(globalThis.unload, definition.unload);
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
