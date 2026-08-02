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

test("public SDK APIs and manifest fields keep bilingual editor descriptions", () => {
  for (const phrase of [
    "Installs the plugin lifecycle callbacks expected by Komari.",
    "注册 Komari 运行时需要的插件生命周期回调。",
    "Calls a declared Komari RPC method with typed parameters and result.",
    "调用已声明的 Komari RPC 方法，并获得类型安全的参数和返回值。",
    "Gets runtime metadata for one method.",
    "获取指定方法的运行时元数据，包括参数和返回值说明（如果服务器提供）。",
  ]) {
    assert.match(declarations, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
  }

  assert.match(manifestSchema.description, /Komari plugin manifest/);
  assert.match(manifestSchema.description, /Komari 插件/);
  assert.match(manifestSchema.properties.name.description, /Display name/);
  assert.match(manifestSchema.properties.name.description, /显示的插件名称/);
  assert.match(manifestSchema.$defs.permissions.properties.allowSystemRPC.description, /system RPC/);
  assert.match(manifestSchema.$defs.permissions.properties.allowSystemRPC.description, /系统 RPC/);
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
