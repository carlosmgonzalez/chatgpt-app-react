import { API_URL } from "../api/api-chat-gpt";

export const prosConsStreamUseCase = async (
  prompt: string,
  callback: (chunk: string) => void
) => {
  try {
    const res = await fetch(`${API_URL}/pros-cons-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error("No readable stream available");

    const reader = res.body!.getReader();
    if (!reader) throw new Error("Problem with the reader");

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      callback(chunk);
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};
