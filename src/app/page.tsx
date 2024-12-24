import Card from "@/components/card";
import getAllCharacters from "./services/get-all-characters";
import Header from "@/components/header";
import PageControl from "@/components/page-control";

type searchParamsT = Promise<{ page: string; name: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams: searchParamsT;
}) {
  const { page, name } = await searchParams;

  const characters = await getAllCharacters({ page, name });
  return (
    <div className="px-10">
      <Header />
      <div className="p-10 bg-gray rounded">
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {characters.data.map((character) => (
            <Card
              key={character._id}
              title={character.name}
              image={character.imageUrl}
              featuredFilms={[...character.films, ...character.shortFilms]}
              id={String(character._id)}
            />
          ))}
        </div>
        <PageControl totalPages={characters.info.totalPages} />
      </div>
    </div>
  );
}
