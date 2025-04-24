import { apiChatGpt } from "../api/api-chat-gpt";

export interface Messages {
  role: "user" | "assistant";
  content: Content;
}

export interface Content {
  value: string;
  annotations: Annotation[];
}

export interface Annotation {
  type: string;
  text: string;
  start_index: number;
  end_index: number;
}

export const loadMessagesUseCase = async (threadId: string) => {
  try {
    const { data } = await apiChatGpt.post<Messages[]>(
      "/assistant/load-messages",
      {
        threadId,
      }
    );

    return {
      ok: true,
      messages: data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
