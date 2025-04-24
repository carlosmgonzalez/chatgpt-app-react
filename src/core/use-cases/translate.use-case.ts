import { API_URL } from "../api/api-chat-gpt";

export const translateUseCase = async (
  prompt: string,
  lang: string,
  callback: (chunk: string) => void
) => {
  try {
    const res = await fetch(`${API_URL}/chat-gpt/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        lang,
      }),
    });

    if (!res.ok) throw new Error();

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      callback(chunk);
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};
