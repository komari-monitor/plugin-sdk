# @komari-monitor/plugin-sdk

TypeScript types and small runtime helpers for Komari server plugins.

The package targets Komari's CommonJS goja runtime. It does not add browser APIs
or assume a full Node.js implementation.

Add the following to `komari-plugin.json` to enable manifest completion in VS
Code:

```json
{
  "$schema": "./node_modules/@komari-monitor/plugin-sdk/schema/komari-plugin.schema.json",
  "name": "Example",
  "short": "example"
}
```

```ts
import { definePlugin, jsonResponse, server } from "@komari-monitor/plugin-sdk";

definePlugin({
  load() {
    server.route("GET", "/hello", (_req, res) => {
      jsonResponse(res, { ok: true });
    });
  },
});
```

Known Komari RPC methods have TypeScript parameter and return-value hints:

```ts
import { rpc, rpcCatalog } from "@komari-monitor/plugin-sdk";

const nodes = await rpc.call("common:getNodes");
const exists = await rpc.has("public:queryMetrics");
const meta = await rpc.help("common:getNodes");
const declared = rpcCatalog["common:getNodes"];
```

`rpc.call()` is for the SDK's typed Komari RPC catalog. Use `server.call()` for
dynamic methods or plugin-owned methods. `rpcCatalog` contains the declared
parameter and return descriptions for the Komari `1.4.1` API. `rpc.has()` checks
the method list of the current Komari server without executing that business
method; `rpc.help()` returns its runtime name, parameter metadata, and return
description when the server provides them. These calls use `server.call()`
internally and therefore require the `allowSystemRPC` permission.

The catalog is a snapshot for Komari `1.4.1`; `rpc.has()` remains the runtime
authority when the target server has a different set of registered methods.

Repository: https://github.com/komari-monitor/plugin-sdk
