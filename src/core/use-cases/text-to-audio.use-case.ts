import { API_URL } from "../api/api-chat-gpt";

export const textToAudioUseCase = async (prompt: string, voice?: string) => {
  try {
    const res = await fetch(`${API_URL}/text-to-audio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        voice,
      }),
    });

    if (!res.ok)
      throw new Error("Something went wrong whit request text to audio");

    const audioFile = await res.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      audioUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
};
