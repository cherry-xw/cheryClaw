/**
 * 聊天服务统一接口
 * 后续扩展其他 AI 服务时实现此接口即可
 */
export interface ChatService {
  /** 流式聊天 */
  stream(message: string): AsyncIterable<string>;
}

/** 聊天服务配置基类 */
export interface ChatConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}