import { ImageGenerationRes } from "../../interfaces/image-generation.interface";
import { apiChatGpt } from "../api/api-chat-gpt";

export const imageGenerationUseCase = async (prompt: string) => {
  try {
    const res = await apiChatGpt.post<ImageGenerationRes>("/image-generation", {
      prompt,
    });

    if (res.status !== 201)
      throw new Error("Something went wrong calling to image generation");

    return {
      ok: true,
      url: res.data.url,
      alt: res.data.revised_prompt,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      url: "",
      alt: "",
    };
  }
};
