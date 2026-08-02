/**
 * 国际化文本，可以直接写字符串，也可以按语言代码提供文本。
 * Localized text: either a plain string or a map keyed by language code.
 */
export type I18nText = string | Record<string, string>;
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

/** Runtime metadata returned by `rpc.help`.
 * `rpc.help` 返回的运行时方法说明。
 */
export interface RpcMethodMeta {
  name: string;
  summary?: string;
  description?: string;
  params?: Array<{
    name: string;
    type?: string;
    required?: boolean;
    description?: string;
  }>;
  returns?: string;
  example?: JsonValue;
}

/** Version and registry hash reported by Komari.
 * Komari 返回的版本和方法注册表哈希。
 */
export interface RpcVersionInfo {
  version: string;
  hash: string;
}

/** Type-level parameter/result pair for one RPC method.
 * 单个 RPC 方法的参数和返回值类型描述。
 */
export interface RpcMethodSpec<Params, Result> {
  params: Params;
  result: Result;
}

export interface RpcMethodMap {
  "rpc.methods": RpcMethodSpec<{ internal?: boolean } | undefined, string[]>;
  "rpc.version": RpcMethodSpec<undefined, string>;
  "rpc.ping": RpcMethodSpec<undefined, string>;
  "rpc.help": RpcMethodSpec<{ method?: string } | undefined, RpcMethodMeta | RpcMethodMeta[]>;
  "common:getNodes": RpcMethodSpec<{ uuid?: string } | undefined, Client | Record<string, Client>>;
  "common:getNodesLatestStatus": RpcMethodSpec<{ uuid?: string; uuids?: string[] } | undefined, Record<string, unknown>>;
  "common:getMe": RpcMethodSpec<undefined, CurrentUser>;
  "common:getPublicInfo": RpcMethodSpec<undefined, Record<string, unknown>>;
  "common:getVersion": RpcMethodSpec<undefined, RpcVersionInfo>;
  "common:getNodeRecentStatus": RpcMethodSpec<{ uuid: string }, RecentStatusResponse>;
  "common:getRecords": RpcMethodSpec<Record<string, unknown>, Record<string, unknown>>;
  "public:getMe": RpcMethodSpec<undefined, CurrentUser>;
  "public:getNodesInformation": RpcMethodSpec<undefined, Client[]>;
  "public:getPublicSettings": RpcMethodSpec<undefined, Record<string, unknown>>;
  "public:getVersion": RpcMethodSpec<undefined, RpcVersionInfo>;
  "public:getClientRecentRecords": RpcMethodSpec<{ uuid: string }, unknown>;
  "public:getRecordsByUUID": RpcMethodSpec<Record<string, unknown>, Record<string, unknown>>;
  "public:getPingRecords": RpcMethodSpec<Record<string, unknown>, Record<string, unknown>>;
  "public:getPublicPingTasks": RpcMethodSpec<undefined, unknown[]>;
  "public:recordVisitorEvent": RpcMethodSpec<{
    event: string;
    action?: string;
    operation?: string;
    path?: string;
    route?: string;
    target?: string;
    detail?: Record<string, unknown>;
  }, { status: string }>;
  "public:listMetricDefinitions": RpcMethodSpec<undefined, MetricDefinition[]>;
  "public:queryMetrics": RpcMethodSpec<Record<string, unknown>, MetricSeriesResponse>;
  "public:getPingMetricStats": RpcMethodSpec<Record<string, unknown>, PingMetricStatsResponse>;
  "admin:addClient": RpcMethodSpec<{ name?: string } | undefined, { uuid: string; token: string }>;
  "admin:editClient": RpcMethodSpec<Record<string, unknown>, null>;
  "admin:removeClient": RpcMethodSpec<{ uuid: string }, null>;
  "admin:getClient": RpcMethodSpec<{ uuid: string }, Client>;
  "admin:listClients": RpcMethodSpec<undefined, Client[]>;
  "admin:getClientToken": RpcMethodSpec<{ uuid: string }, { token: string }>;
  "admin:clearRecords": RpcMethodSpec<undefined, null>;
  "admin:getTasks": RpcMethodSpec<undefined, ExecTask[]>;
  "admin:getTaskById": RpcMethodSpec<{ task_id: string }, ExecTask>;
  "admin:getTasksByClientId": RpcMethodSpec<{ uuid: string }, ExecTask[]>;
  "admin:getSpecificTaskResult": RpcMethodSpec<{ task_id: string; uuid: string }, TaskResult>;
  "admin:getTaskResultsByTaskId": RpcMethodSpec<{ task_id: string }, TaskResult[]>;
  "admin:exec": RpcMethodSpec<{ command: string; clients: string[] }, ExecTaskSummary>;
  "admin:addPingTask": RpcMethodSpec<Record<string, unknown>, { task_id: number }>;
  "admin:deletePingTask": RpcMethodSpec<{ id: number[] }, null>;
  "admin:editPingTask": RpcMethodSpec<{ tasks: unknown[] }, null>;
  "admin:getAllPingTasks": RpcMethodSpec<undefined, unknown[]>;
  "admin:orderPingTask": RpcMethodSpec<Record<string, number>, null>;
  "admin:addLoadNotification": RpcMethodSpec<Record<string, unknown>, { task_id: number }>;
  "admin:deleteLoadNotification": RpcMethodSpec<{ id: number[] }, null>;
  "admin:editLoadNotification": RpcMethodSpec<{ notifications: unknown[] }, null>;
  "admin:getAllLoadNotifications": RpcMethodSpec<undefined, unknown[]>;
  "admin:listOfflineNotifications": RpcMethodSpec<undefined, unknown[]>;
  "admin:editOfflineNotification": RpcMethodSpec<unknown[], null>;
  "admin:enableOfflineNotification": RpcMethodSpec<string[], null>;
  "admin:disableOfflineNotification": RpcMethodSpec<string[], null>;
  "admin:listTrafficReportNotifications": RpcMethodSpec<undefined, unknown[]>;
  "admin:editTrafficReportNotifications": RpcMethodSpec<unknown[], null>;
  "admin:enableTrafficReportNotifications": RpcMethodSpec<string[], null>;
  "admin:disableTrafficReportNotifications": RpcMethodSpec<string[], null>;
  "admin:getSessions": RpcMethodSpec<undefined, { current: string; data: unknown[] }>;
  "admin:deleteSession": RpcMethodSpec<{ session: string }, null>;
  "admin:deleteAllSessions": RpcMethodSpec<undefined, null>;
  "admin:getSettings": RpcMethodSpec<undefined, Record<string, unknown>>;
  "admin:editSettings": RpcMethodSpec<Record<string, unknown>, null | { restart_required: true; guide_path: string }>;
  "admin:clearAllRecords": RpcMethodSpec<undefined, null>;
  "admin:orderClients": RpcMethodSpec<Record<string, number>, null>;
  "admin:getLogs": RpcMethodSpec<{ limit?: string; page?: string; msg_type?: string } | undefined, { logs: unknown[]; total: number }>;
  "admin:testSendMessage": RpcMethodSpec<undefined, null>;
  "admin:testGeoip": RpcMethodSpec<{ ip?: string } | undefined, unknown>;
  "admin:listPlugins": RpcMethodSpec<undefined, PluginStatus[]>;
  "admin:setPluginEnabled": RpcMethodSpec<{ short: string; enabled: boolean; approved?: boolean }, null | { requires_approval: true }>;
  "admin:getPluginLogs": RpcMethodSpec<{ short: string }, { logs: string }>;
  "admin:deletePlugin": RpcMethodSpec<{ short: string }, null>;
  "admin:getPluginConfiguration": RpcMethodSpec<{ short: string }, { configuration: unknown; data: Record<string, unknown> }>;
  "admin:setPluginConfiguration": RpcMethodSpec<{ short: string; data: Record<string, unknown> }, null>;
  "admin:getXtermjsSettings": RpcMethodSpec<undefined, Record<string, unknown>>;
  "admin:setXtermjsSettings": RpcMethodSpec<Record<string, unknown>, Record<string, unknown>>;
  "admin:getMessageSenderProvider": RpcMethodSpec<{ provider?: string } | undefined, unknown>;
  "admin:setMessageSenderProvider": RpcMethodSpec<Record<string, unknown>, { message: string }>;
  "admin:getOidcProvider": RpcMethodSpec<{ provider?: string } | undefined, unknown>;
  "admin:setOidcProvider": RpcMethodSpec<Record<string, unknown>, { message: string }>;
  "admin:getClipboard": RpcMethodSpec<{ id: string }, unknown>;
  "admin:listClipboard": RpcMethodSpec<undefined, unknown[]>;
  "admin:createClipboard": RpcMethodSpec<Record<string, unknown>, unknown>;
  "admin:updateClipboard": RpcMethodSpec<Record<string, unknown>, unknown>;
  "admin:deleteClipboard": RpcMethodSpec<{ id: string }, null>;
  "admin:batchDeleteClipboard": RpcMethodSpec<{ ids: string[] }, null>;
  "admin:getDatabaseSize": RpcMethodSpec<undefined, Record<string, unknown>>;
  "admin:vacuumDatabase": RpcMethodSpec<undefined, Record<string, unknown>>;
  "admin:listMetricDefinitions": RpcMethodSpec<undefined, MetricDefinition[]>;
  "admin:updateMetricDefinition": RpcMethodSpec<{ name: string; retention_days: number }, MetricDefinition>;
  "admin:getMetricMigrationStatus": RpcMethodSpec<undefined, MetricMigrationStatus>;
  "admin:startMetricMigration": RpcMethodSpec<{ source_driver?: string; source_dsn?: string }, { status: string; message: string }>;
  "admin:cancelMetricMigration": RpcMethodSpec<undefined, { status: string; message: string }>;
  "client:getPingTasks": RpcMethodSpec<undefined, unknown[]>;
  "client:uploadPingResult": RpcMethodSpec<Record<string, unknown>, { status: string }>;
  "client:taskResult": RpcMethodSpec<Record<string, unknown>, { status: string; message: string }>;
}

export type RpcMethodName = keyof RpcMethodMap;
export type RpcMethodResult<M extends RpcMethodName> = RpcMethodMap[M]["result"];
export type RpcMethodParams<M extends RpcMethodName> = RpcMethodMap[M]["params"];
export type RpcCallArgs<P> = [P] extends [undefined]
  ? []
  : undefined extends P
    ? [] | [params: Exclude<P, undefined>]
    : [params: P];

/** Typed RPC client bound to the current Komari server.
 * 连接当前 Komari 服务器的类型安全 RPC 客户端。
 */
export interface RpcClient {
  /**
   * Calls a declared Komari RPC method with typed parameters and result.
   * 调用已声明的 Komari RPC 方法，并获得类型安全的参数和返回值。
   *
   * Methods outside the catalog can be called through `server.call`.
   * 不在 catalog 中的方法请使用 `server.call` 调用。
   * @param method Registered RPC method name.
   * @param params Optional parameters for the method.
   */
  call<M extends RpcMethodName>(method: M, ...params: RpcCallArgs<RpcMethodParams<M>>): Promise<RpcMethodResult<M>>;
  /**
   * Lists methods registered by the current server.
   * 获取当前服务器已注册的方法列表。
   * @param includeInternal Include internal methods when true; this may require
   * the plugin `allowSystemRPC` permission.
   */
  methods(includeInternal?: boolean): Promise<string[]>;
  /**
   * Checks whether a method exists without executing the method itself.
   * 检查方法是否存在，但不会执行该业务方法。
   * @param method Fully qualified method name, for example `common:getNodes`.
   */
  has(method: string): Promise<boolean>;
  /**
   * Gets runtime metadata for one method.
   * 获取指定方法的运行时元数据，包括参数和返回值说明（如果服务器提供）。
   * @param method Fully qualified method name.
   */
  help(method: string): Promise<RpcMethodMeta>;
}

export interface Client {
  uuid: string;
  name: string;
  [key: string]: unknown;
}

export interface CurrentUser {
  username: string;
  logged_in: boolean;
  uuid?: string;
  sso_id?: string;
  sso_type?: string;
  "2fa_enabled"?: boolean;
}

export interface RecentStatusResponse { count: number; records: unknown[]; [key: string]: unknown; }
export interface MetricDefinition { name: string; type: string; unit?: string; retention_days: number; [key: string]: unknown; }
export interface MetricSeriesResponse { series?: unknown[]; [key: string]: unknown; }
export interface PingMetricStatsResponse { stats: unknown[]; count: number; [key: string]: unknown; }
export interface ExecTask { task_id: string; clients: string[]; command: string; results: TaskResult[]; }
export interface TaskResult { client: string; result: string; exit_code: number; [key: string]: unknown; }
export interface ExecTaskSummary { task_id: string; clients: string[]; queued_clients: string[]; }
export interface PluginStatus { short: string; enabled: boolean; running: boolean; last_error?: string; [key: string]: unknown; }
export interface MetricMigrationStatus { status: string; is_running: boolean; [key: string]: unknown; }

export interface PluginRequestContext {
  principal?: {
    type?: "agent" | "user" | "api_key" | "anonymous";
    roles?: string[];
    user_uuid?: string;
    client_uuid?: string;
    is_api_key?: boolean;
  };
  role?: string;
  user_uuid?: string;
  client_uuid?: string;
  remote_ip?: string;
  user_agent?: string;
  [key: string]: unknown;
}

export interface PluginRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[]>;
  query: Record<string, string>;
  body: string;
  context: PluginRequestContext;
}

export interface PluginResponse {
  statusCode: number;
  statusMessage?: string;
  streaming: boolean;
  /** Sets a response header before the response is sent.
   * 在响应发送前设置响应头。
   */
  setHeader(name: string, value: string | string[]): this;
  /** Reads a response header.
   * 读取响应头。
   */
  getHeader(name: string): string | string[] | undefined;
  /** Removes a response header.
   * 移除响应头。
   */
  removeHeader(name: string): void;
  /** Writes a response chunk; returns whether the stream can continue.
   * 写入一段响应内容，并返回流是否仍可继续写入。
   */
  write(data: string | Uint8Array): boolean;
  /** Ends the response, optionally writing one final chunk.
   * 可选写入最后一段内容并结束响应。
   */
  end(data?: string): this;
  /** Returns true when the client has disconnected.
   * 判断客户端是否已经断开连接。
   */
  isAborted(): boolean;
}

/** Handler used by `server.route`.
 * `server.route` 使用的请求处理函数。
 */
export type RouteHandler = (req: PluginRequest, res: PluginResponse) => unknown | Promise<unknown>;
/** Handler used by `server.registerRPC`.
 * `server.registerRPC` 使用的 RPC 处理函数。
 */
export type RpcHandler = (...params: any[]) => unknown | Promise<unknown>;

/** Host services injected into a Komari plugin.
 * Komari 注入插件的服务器辅助 API。
 */
export interface PluginServer {
  /**
   * Registers an HTTP route owned by this plugin.
   * 注册由当前插件拥有的 HTTP 路由。
   * @param method HTTP method, such as `GET` or `POST`.
   * @param path Route path, such as `/hello`.
   * @param handler Request handler.
   * @remarks Requires the manifest `permissions.allowRoutes` permission.
   * 需要 manifest 中的 `permissions.allowRoutes` 权限。
   */
  route(method: string, path: string, handler: RouteHandler): void;
  /**
   * Serves a directory as plugin static files.
   * 将目录作为插件静态文件目录提供。
   * @param path URL mount path.
   * @param directory Plugin-relative directory.
   * @param options Set `spa: true` to fall back to the index page.
   * @remarks Requires `permissions.allowRoutes`.
   * 需要 `permissions.allowRoutes` 权限。
   */
  static(path: string, directory: string, options?: { spa?: boolean }): void;
  /**
   * Adds a request or response hook.
   * 注册请求或响应钩子。
   * @param kind Hook phase: `request` or `response`.
   * @param handler Hook callback, or use the matcher overload below.
   * @remarks Requires `permissions.allowHooks`.
   * 需要 `permissions.allowHooks` 权限。
   */
  hook(kind: "request" | "response", handler: (...args: any[]) => unknown): void;
  /** Adds a hook that only runs for matching requests.
   * 注册只匹配指定路径的请求/响应钩子。
   */
  hook(kind: "request" | "response", matcher: string, handler: (...args: any[]) => unknown): void;
  /**
   * Injects HTML into the page head and body.
   * 向页面 head 和 body 注入 HTML。
   * @param head HTML inserted before `</head>`.
   * @param body HTML inserted before `</body>`.
   * @remarks Requires `permissions.allowHTMLInject`.
   * 需要 `permissions.allowHTMLInject` 权限。
   */
  injectHTML(head: string, body: string): void;
  /**
   * Calls a typed method from the current Komari RPC registry.
   * 调用当前 Komari RPC 注册表中的类型安全方法。
   * @param method Known catalog method name.
   * @param params Method parameters.
   */
  call<M extends RpcMethodName>(method: M, ...params: RpcCallArgs<RpcMethodParams<M>>): Promise<RpcMethodResult<M>>;
  /** Calls a dynamic or plugin-owned RPC method.
   * 调用动态方法或其他插件注册的方法。
   * @param method Fully qualified method name.
   * @param params Method parameters.
   */
  call<T = unknown>(method: string, ...params: any[]): Promise<T>;
  /**
   * Registers an RPC method owned by this plugin.
   * 注册由当前插件拥有的 RPC 方法。
   * @param method Method name, usually in the `plugin:` namespace.
   * @param handler Method handler.
   */
  registerRPC(method: string, handler: RpcHandler): void;
  /**
   * Schedules a cron callback.
   * 注册一个 cron 定时任务。
   * @param expression Standard five-field cron expression.
   * @param handler Callback invoked on schedule.
   */
  cron(expression: string, handler: () => unknown | Promise<unknown>): void;
  /**
   * Reads the plugin's saved configuration values.
   * 读取插件保存的配置值。
   * @returns The saved configuration object, or an empty object when unset.
   */
  getConfig<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<T>;
}

/** Lifecycle callbacks installed by `definePlugin`.
 * `definePlugin` 注册的插件生命周期回调。
 */
export interface PluginDefinition {
  /** Called when Komari loads or reloads the plugin.
   * Komari 加载或热重载插件时调用。
   */
  load?: () => unknown | Promise<unknown>;
  /** Called before Komari unloads or replaces the plugin.
   * Komari 卸载或替换插件前调用。
   */
  unload?: () => unknown | Promise<unknown>;
}

export interface PluginPermissions {
  node?: boolean;
  allowSystemRPC?: boolean;
  allowRoutes?: boolean;
  allowHooks?: boolean;
  allowHTMLInject?: boolean;
  allowExec?: boolean;
  allowListen?: boolean;
  allowAllFileAccess?: boolean;
  maxHTTPBodyBytes?: number;
  maxChildOutputBytes?: number;
  timeout?: number;
}

export interface PluginPage {
  file?: string;
  title: I18nText;
  icon?: string;
  type?: "iframe" | "redirect";
  url?: string;
  visibility?: "admin" | "public";
}

export interface PluginConfigurationItem {
  key: string;
  name: I18nText;
  type: "string" | "number" | "select" | "switch" | "title" | "richtext";
  options?: string;
  default?: JsonValue;
  required?: boolean;
  help?: I18nText;
}

export interface PluginManifest {
  name: I18nText;
  short: string;
  description?: I18nText;
  author?: I18nText;
  version?: string;
  url?: string;
  icon?: string;
  komari?: string;
  entry?: string;
  permissions?: PluginPermissions;
  configuration?: { type: "managed"; data: PluginConfigurationItem[] };
  pages?: PluginPage[];
}

export interface RpcCatalogEntry {
  params: string;
  returns: string;
}

export type RpcCatalog = {
  komari: string;
} & Record<string, string | RpcCatalogEntry> & {
  [method in RpcMethodName]: RpcCatalogEntry;
};

/**
 * Lazily loaded host API for the current plugin.
 * 当前插件的延迟加载服务器 API。
 */
export declare const server: PluginServer;
/**
 * Typed RPC client for the current Komari server.
 * 当前 Komari 服务器的类型安全 RPC 客户端。
 */
export declare const rpc: RpcClient;
/**
 * Komari 1.4.1 RPC method catalog with parameter and return descriptions.
 * Komari 1.4.1 RPC 方法目录，包含参数和返回值说明。
 */
export declare const rpcCatalog: RpcCatalog;
/**
 * Installs the plugin lifecycle callbacks expected by Komari.
 * 注册 Komari 运行时需要的插件生命周期回调。
 *
 * The definition is returned unchanged, so this function preserves the
 * inferred type of the object passed to it.
 * 函数会原样返回 definition，因此会保留传入对象的推导类型。
 * @param definition Plugin load/unload callbacks.
 * @returns The same definition object.
 */
export declare function definePlugin<T extends PluginDefinition>(definition: T): T;
/**
 * Sends a JSON response and ends the current request.
 * 写入 JSON 响应并结束当前请求。
 * @param res Plugin response object.
 * @param value Value serialized with `JSON.stringify`.
 * @param statusCode HTTP status code, defaulting to `200`.
 * @returns The same response object for fluent usage.
 */
export declare function jsonResponse<T>(res: PluginResponse, value: T, statusCode?: number): PluginResponse;
/**
 * Sends a text response and ends the current request.
 * 写入文本响应并结束当前请求。
 * @param res Plugin response object.
 * @param value Text converted with `String`.
 * @param statusCode HTTP status code, defaulting to `200`.
 * @param contentType Response content type, defaulting to UTF-8 text.
 * @returns The same response object for fluent usage.
 */
export declare function textResponse(res: PluginResponse, value: string, statusCode?: number, contentType?: string): PluginResponse;
/**
 * Validates a manifest and returns human-readable validation errors.
 * 校验 manifest，并返回可读的错误信息列表。
 * @param manifest Unknown value to validate.
 * @returns An empty array when valid.
 */
export declare function validateManifest(manifest: unknown): string[];
/**
 * Validates a manifest or throws when it is invalid.
 * 校验 manifest；无效时抛出异常。
 * @param manifest Unknown manifest value.
 * @throws Error when the manifest violates the SDK schema.
 */
export declare function assertValidManifest(manifest: unknown): asserts manifest is PluginManifest;
/**
 * JSON Schema used by the Komari plugin manifest editor and validator.
 * Komari 插件 manifest 编辑器和校验器使用的 JSON Schema。
 */
export declare const manifestSchema: unknown;

declare const __storageDir__: string;
