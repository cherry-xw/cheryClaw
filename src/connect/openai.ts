import { ChatOpenAI } from "@langchain/openai";
import type { ChatConfig, ChatService } from "./types.ts";

/**
 * OpenAI 聊天服务实现
 */
/**
 * OpenAIChat 类实现了 ChatService 接口，用于提供与 OpenAI API 的聊天功能
 * 支持流式输出，可以逐块返回生成的内容
 */
export class OpenAIChat implements ChatService {
  // 私有属性，用于存储 ChatOpenAI 实例
  private chat: ChatOpenAI;

  constructor(config: ChatConfig) {
    // 创建并配置 ChatOpenAI 实例
    this.chat = new ChatOpenAI({
      apiKey: config.apiKey,    // API 密钥
      model: config.model,
      configuration: {
        baseURL: config.baseUrl,
      },
      streaming: true,
    });
  }

  async *stream(message: string): AsyncIterable<string> {
    const stream = await this.chat.stream(message);
    for await (const chunk of stream) {
      const content = chunk.content;
      if (typeof content === "string") {
        yield content;
      }
    }
  }
}

/** 创建 OpenAI 聊天服务实例 */
export function createOpenAIChat(config: ChatConfig): ChatService {
  return new OpenAIChat(config);
}