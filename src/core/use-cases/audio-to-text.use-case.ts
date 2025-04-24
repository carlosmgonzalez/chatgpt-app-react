import { apiChatGpt } from "../api/api-chat-gpt";

export const audioToTextUseCase = async (prompt: string, audioFile: File) => {
  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("file", audioFile);

    const { data, status } = await apiChatGpt.post(
      "/chat-gpt/audio-to-text",
      formData
    );

    if (!data || status !== 201)
      throw new Error("Something went wrong when call audio to text");

    return {
      ok: true,
      message: data.text,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
