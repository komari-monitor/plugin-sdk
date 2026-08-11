/**
 * Localized text: either a plain string or a map keyed by language code.
 */
export type I18nText = string | Record<string, string>;
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

/** Notification event payload accepted by `admin:sendNotification`.
 * `event`/`message`/`emoji` accept arbitrary values; `clients` entries only
 * need a `uuid` (the server resolves full client info).
 */
export interface NotificationEventMessage {
  event?: any;
  message?: any;
  emoji?: any;
  time?: string;
  clients?: Array<{ uuid: string }>;
}

/** Runtime metadata returned by `rpc.help`.
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
 */
export interface RpcVersionInfo {
  version: string;
  hash: string;
}

/** Type-level parameter/result pair for one RPC method.
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
  "admin:sendNotification": RpcMethodSpec<{ event: NotificationEventMessage }, null>;
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
  "admin:dbQuery": RpcMethodSpec<DatabaseQueryParams, DatabaseQueryResult>;
  "admin:dbExec": RpcMethodSpec<DatabaseExecParams, DatabaseExecResult>;
  "admin:dbTables": RpcMethodSpec<DatabaseTablesParams | undefined, DatabaseTablesResult>;
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
 */
export interface RpcClient {
  /**
   * Calls a declared Komari RPC method with typed parameters and result.
   *
   * Methods outside the catalog can be called through `server.call`.
   * @param method Registered RPC method name.
   * @param params Optional parameters for the method.
   */
  call<M extends RpcMethodName>(method: M, ...params: RpcCallArgs<RpcMethodParams<M>>): Promise<RpcMethodResult<M>>;
  /**
   * Lists methods registered by the current server.
   * @param includeInternal Include internal methods when true; this may require
   * the plugin `allowSystemRPC` permission.
   */
  methods(includeInternal?: boolean): Promise<string[]>;
  /**
   * Checks whether a method exists without executing the method itself.
   * @param method Fully qualified method name, for example `common:getNodes`.
   */
  has(method: string): Promise<boolean>;
  /**
   * Gets runtime metadata for one method, including parameter and result descriptions when provided by the server.
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
export type DatabaseTarget = "main" | "metrics";
export interface DatabaseQueryParams { database?: DatabaseTarget; sql: string; args?: JsonValue[]; limit?: number; }
export interface DatabaseQueryResult { database: DatabaseTarget; driver: string; columns: string[]; rows: JsonValue[][]; row_count: number; truncated: boolean; }
export interface DatabaseExecParams { database?: DatabaseTarget; sql: string; args?: JsonValue[]; }
export interface DatabaseExecResult { database: DatabaseTarget; driver: string; rows_affected: number; last_insert_id: number | null; }
export interface DatabaseTablesParams { database?: DatabaseTarget; }
export interface DatabaseTablesResult { database: DatabaseTarget; driver: string; tables: string[]; }

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
   */
  setHeader(name: string, value: string | string[]): this;
  /** Reads a response header.
   */
  getHeader(name: string): string | string[] | undefined;
  /** Removes a response header.
   */
  removeHeader(name: string): void;
  /** Writes a response chunk; returns whether the stream can continue.
   */
  write(data: string | Uint8Array): boolean;
  /** Ends the response, optionally writing one final chunk.
   */
  end(data?: string): this;
  /** Returns true when the client has disconnected.
   */
  isAborted(): boolean;
}

export interface PluginSessionOptions {
  user_uuid: string;
  expires: number;
  user_agent?: string;
  ip?: string;
  login_method: string;
}

export interface PluginSession {
  session: string;
}

/** Handler used by `server.route`.
 */
export type RouteHandler = (req: PluginRequest, res: PluginResponse) => unknown | Promise<unknown>;
/** Handler used by `server.registerRPC`.
 */
export type RpcHandler = (...params: any[]) => unknown | Promise<unknown>;

/** Host services injected into a Komari plugin.
 */
export interface PluginServer {
  /**
   * Registers an HTTP route owned by this plugin.
   * @param method HTTP method, such as `GET` or `POST`.
   * @param path Route path, such as `/hello`.
   * @param handler Request handler.
   * @remarks Requires the `permissions.allowRoutes` manifest permission.
   */
  route(method: string, path: string, handler: RouteHandler): void;
  /**
   * Serves a directory as plugin static files.
   * @param path URL mount path.
   * @param directory Plugin-relative directory.
   * @param options Set `spa: true` to fall back to the index page.
   * @remarks Requires the `permissions.allowRoutes` manifest permission.
   */
  static(path: string, directory: string, options?: { spa?: boolean }): void;
  /**
   * Adds a request or response hook.
   * @param kind Hook phase: `request` or `response`.
   * @param handler Hook callback, or use the matcher overload below.
   * @remarks Requires the `permissions.allowHooks` manifest permission.
   */
  hook(kind: "request" | "response", handler: (...args: any[]) => unknown): void;
  /** Adds a hook that only runs for matching requests.
   */
  hook(kind: "request" | "response", matcher: string, handler: (...args: any[]) => unknown): void;
  /**
   * Injects HTML into the page head and body.
   * @param head HTML inserted before `</head>`.
   * @param body HTML inserted before `</body>`.
   * @remarks Requires the `permissions.allowHTMLInject` manifest permission.
   */
  injectHTML(head: string, body: string): void;
  /**
   * Calls a typed method from the current Komari RPC registry.
   * @param method Known catalog method name.
   * @param params Method parameters.
   */
  call<M extends RpcMethodName>(method: M, ...params: RpcCallArgs<RpcMethodParams<M>>): Promise<RpcMethodResult<M>>;
  /** Calls a dynamic or plugin-owned RPC method.
   * @param method Fully qualified method name.
   * @param params Method parameters.
   */
  call<T = unknown>(method: string, ...params: any[]): Promise<T>;
  /**
   * Creates a native Komari session for one existing user.
   * @remarks Requires the `permissions.allowSystemRPC` manifest permission.
   */
  createSession(options: PluginSessionOptions): Promise<PluginSession>;
  /**
   * Registers an RPC method owned by this plugin.
   * @param method Method name, usually in the `plugin:` namespace.
   * @param handler Method handler.
   */
  registerRPC(method: string, handler: RpcHandler): void;
  /**
   * Schedules a cron callback.
   * @param expression Standard five-field cron expression.
   * @param handler Callback invoked on schedule.
   */
  cron(expression: string, handler: () => unknown | Promise<unknown>): void;
  /**
   * Reads the plugin's saved configuration values.
   * @returns The saved configuration object, or an empty object when unset.
   */
  getConfig<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<T>;
}

/** Lifecycle callbacks installed by `definePlugin`.
 */
export interface PluginDefinition {
  /** Called when Komari loads or reloads the plugin.
   */
  load?: () => unknown | Promise<unknown>;
  /** Called before Komari unloads or replaces the plugin.
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
 */
export declare const server: PluginServer;
/**
 * Typed RPC client for the current Komari server.
 */
export declare const rpc: RpcClient;
/**
 * Komari 1.4.x RPC method catalog with parameter and result descriptions.
 */
export declare const rpcCatalog: RpcCatalog;
/**
 * Installs the plugin lifecycle callbacks expected by Komari.
 *
 * The definition is returned unchanged, so this function preserves the
 * inferred type of the object passed to it.
 * @param definition Plugin load/unload callbacks.
 * @returns The same definition object.
 */
export declare function definePlugin<T extends PluginDefinition>(definition: T): T;
/**
 * Sends a JSON response and ends the current request.
 * @param res Plugin response object.
 * @param value Value serialized with `JSON.stringify`.
 * @param statusCode HTTP status code, defaulting to `200`.
 * @returns The same response object for fluent usage.
 */
export declare function jsonResponse<T>(res: PluginResponse, value: T, statusCode?: number): PluginResponse;
/**
 * Sends a text response and ends the current request.
 * @param res Plugin response object.
 * @param value Text converted with `String`.
 * @param statusCode HTTP status code, defaulting to `200`.
 * @param contentType Response content type, defaulting to UTF-8 text.
 * @returns The same response object for fluent usage.
 */
export declare function textResponse(res: PluginResponse, value: string, statusCode?: number, contentType?: string): PluginResponse;
/**
 * Validates a manifest and returns human-readable validation errors.
 * @param manifest Unknown value to validate.
 * @returns An empty array when valid.
 */
export declare function validateManifest(manifest: unknown): string[];
/**
 * Validates a manifest or throws when it is invalid.
 * @param manifest Unknown manifest value.
 * @throws Error when the manifest violates the SDK schema.
 */
export declare function assertValidManifest(manifest: unknown): asserts manifest is PluginManifest;
/**
 * JSON Schema used by the Komari plugin manifest editor and validator.
 */
export declare const manifestSchema: unknown;

/** Runtime globals provided by Komari when the corresponding capability is enabled. */
declare global {
  /**
   * Absolute long-term storage directory for this plugin.
   * Available when the manifest enables `permissions.node`.
   */
  const __storageDir__: string;
  /**
   * CommonJS module loader provided by Komari's Node.js-compatible runtime.
   * Available when the manifest enables `permissions.node`.
   */
  function require(moduleName: string): any;
}
