export type I18nText = string | Record<string, string>;
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

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

export interface RpcVersionInfo {
  version: string;
  hash: string;
}

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

export interface RpcClient {
  call<M extends RpcMethodName>(method: M, ...params: RpcCallArgs<RpcMethodParams<M>>): Promise<RpcMethodResult<M>>;
  methods(includeInternal?: boolean): Promise<string[]>;
  has(method: string): Promise<boolean>;
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
  setHeader(name: string, value: string | string[]): this;
  getHeader(name: string): string | string[] | undefined;
  removeHeader(name: string): void;
  write(data: string | Uint8Array): boolean;
  end(data?: string): this;
  isAborted(): boolean;
}

export type RouteHandler = (req: PluginRequest, res: PluginResponse) => unknown | Promise<unknown>;
export type RpcHandler = (...params: any[]) => unknown | Promise<unknown>;

export interface PluginServer {
  route(method: string, path: string, handler: RouteHandler): void;
  static(path: string, directory: string, options?: { spa?: boolean }): void;
  hook(kind: "request" | "response", handler: (...args: any[]) => unknown): void;
  hook(kind: "request" | "response", matcher: string, handler: (...args: any[]) => unknown): void;
  injectHTML(head: string, body: string): void;
  call<M extends RpcMethodName>(method: M, ...params: RpcCallArgs<RpcMethodParams<M>>): Promise<RpcMethodResult<M>>;
  call<T = unknown>(method: string, ...params: any[]): Promise<T>;
  registerRPC(method: string, handler: RpcHandler): void;
  cron(expression: string, handler: () => unknown | Promise<unknown>): void;
  getConfig<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<T>;
}

export interface PluginDefinition {
  load?: () => unknown | Promise<unknown>;
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

export declare const server: PluginServer;
export declare const rpc: RpcClient;
export declare const rpcCatalog: RpcCatalog;
export declare function definePlugin<T extends PluginDefinition>(definition: T): T;
export declare function jsonResponse<T>(res: PluginResponse, value: T, statusCode?: number): PluginResponse;
export declare function textResponse(res: PluginResponse, value: string, statusCode?: number, contentType?: string): PluginResponse;
export declare function validateManifest(manifest: unknown): string[];
export declare function assertValidManifest(manifest: unknown): asserts manifest is PluginManifest;
export declare const manifestSchema: unknown;

declare const __storageDir__: string;
