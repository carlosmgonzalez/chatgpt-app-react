import { Thread } from "../../interfaces/create-thread.interface";
import { apiChatGpt } from "../api/api-chat-gpt";

export const createThreadUseCase = async () => {
  try {
    const { data } = await apiChatGpt.post<Thread>("/assistant/create-thread");
    return {
      ok: true,
      thread: data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
