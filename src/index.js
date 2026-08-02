"use strict";

const { assertValidManifest, validateManifest } = require("./manifest");
const { createRpcClient } = require("./rpc");
const manifestSchema = require("../schema/komari-plugin.schema.json");
const rpcCatalog = require("./rpc-catalog.json");

let cachedServer;

function getServer() {
  if (!cachedServer) {
    cachedServer = require("server");
  }
  return cachedServer;
}

/**
 * Registers the lifecycle functions expected by the Komari runtime.
 * The returned value is unchanged so this can also be used as a type helper.
 */
function definePlugin(definition) {
  if (!definition || typeof definition !== "object") {
    throw new TypeError("definePlugin requires a plugin definition object");
  }

  const load = typeof definition.load === "function" ? definition.load : () => {};
  const unload = typeof definition.unload === "function" ? definition.unload : () => {};

  globalThis.load = load;
  globalThis.unload = unload;
  return definition;
}

function jsonResponse(res, value, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(value));
  return res;
}

function textResponse(res, value, statusCode = 200, contentType = "text/plain; charset=utf-8") {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(String(value));
  return res;
}

const exportsObject = {
  assertValidManifest,
  definePlugin,
  jsonResponse,
  manifestSchema,
  rpc: createRpcClient(getServer),
  rpcCatalog,
  textResponse,
  validateManifest,
};

Object.defineProperty(exportsObject, "server", {
  enumerable: true,
  get: getServer,
});

module.exports = exportsObject;
