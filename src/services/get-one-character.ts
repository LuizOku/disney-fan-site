import { Character } from "../shared/character";

interface OneCharacterApiResponse {
  info: {
    count: number;
  };
  data: Character;
}

const getOneCharacter = async ({
  id,
}: {
  id: string;
}): Promise<OneCharacterApiResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`https://api.disneyapi.dev/character/${id}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message ?? "Error Fetching Character");
  }

  const data = await response.json();

  return data;
};

export default getOneCharacter;
