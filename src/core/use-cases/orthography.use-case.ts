import { type OrthographyResponse } from "../../interfaces/orthography.interface";

export const orthographyUseCase = async (prompt: string) => {
  const URL = import.meta.env.VITE_URL_API;

  try {
    const res = await fetch(`${URL}/check-orthography`, {
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
