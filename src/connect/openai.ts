import { ChatOpenAI } from "@langchain/openai";
import type { ChatConfig, ChatService } from "./types.ts";

export class OpenAIChat implements ChatService {
  private chat: ChatOpenAI;

  constructor(config: ChatConfig) {
    this.chat = new ChatOpenAI({
      apiKey: config.apiKey,
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

export function createOpenAIChat(config: ChatConfig): ChatService {
  return new OpenAIChat(config);
}