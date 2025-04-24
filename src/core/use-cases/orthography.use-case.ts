import { type OrthographyResponse } from "../../interfaces/orthography.interface";
import { API_URL } from "../api/api-chat-gpt";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const res = await fetch(`${API_URL}/chat-gpt/check-orthography`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!res.ok) throw new Error("The request could not be made");

    const data: OrthographyResponse = await res.json();

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "The request could not be made",
    };
  }
};
