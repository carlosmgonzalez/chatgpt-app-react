import { ProsConsResponse } from "../../interfaces/pros-cons.interface";
import { apiChatGpt } from "../api/api-chat-gpt";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const res = await apiChatGpt.post<ProsConsResponse>("/chat-gpt/pros-cons", {
      prompt,
    });

    if (res.status !== 201) throw new Error("The request could not be made");

    return {
      ok: true,
      message: res.data.message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
