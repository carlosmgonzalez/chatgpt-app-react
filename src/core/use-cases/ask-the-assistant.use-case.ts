import { apiChatGpt } from "../api/api-chat-gpt";
import { Messages } from "./load-messages.use-case";

export const askTheAssistantUseCase = async (
  question: string,
  threadId: string
) => {
  try {
    const res = await apiChatGpt.post<Messages[]>("/assistant/user-question", {
      threadId,
      question,
    });

    if (res.status !== 201)
      throw new Error(
        "Something went wrong while asking a question to the assistant"
      );

    return {
      ok: true,
      messages: res.data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
