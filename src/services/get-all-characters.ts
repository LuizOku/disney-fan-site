import { Character } from "../shared/character";

interface AllCharactersApiResponse {
  info: {
    totalPages: number;
    count: number;
    previousPage: string | null;
    nextPage: string | null;
  };
  data: Character[];
}

const getAllCharacters = async ({
  page,
  name,
}: {
  page: string;
  name: string;
}): Promise<AllCharactersApiResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://api.disneyapi.dev/character?page=${page ?? 1}${
      name ? `&name=${name}` : ""
    }`,
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message ?? "Error Fetching Characters");
  }

  const data = await response.json();

  return data;
};

export default getAllCharacters;
