"use strict";

function createRpcClient(getServer) {
  const methods = (includeInternal = false) =>
    getServer().call("rpc.methods", { internal: includeInternal });

  return {
    call(method, ...params) {
      return getServer().call(method, ...params);
    },

    methods,

    has(method) {
      return methods(true).then((registered) => registered.includes(method));
    },

    help(method) {
      return getServer().call("rpc.help", { method });
    },
  };
}

module.exports = { createRpcClient };
