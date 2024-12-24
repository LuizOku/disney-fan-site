import Button from "@/components/button";
import Header from "@/components/header";
import getOneCharacter from "@/services/get-one-character";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type paramsT = Promise<{ id: string }>;

export default async function Character({ params }: { params: paramsT }) {
  const { id } = await params;
  const character = await getOneCharacter({ id });

  return (
    <div className="px-10">
      <Header />
      <div className="p-10 bg-gray rounded">
        <section className="flex flex-col py-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <Image
              className="rounded-lg h-[500px] object-cover"
              src={character.data.imageUrl}
              alt={character.data.name}
              width={300}
              height={800}
            />
            <div className=" max-h-[500px] overflow-auto">
              <h1 className="text-4xl font-semibold mb-4">
                {character.data.name}
              </h1>
              <p className="text-black text-sm mb-6">
                Last Updated:{" "}
                {format(new Date(character.data.updatedAt), "LLLL do, yyyy")}
              </p>
              {character.data.films.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    Featured Films
                  </h2>
                  <ul className="list-disc ml-5 px-2">
                    {character.data.films.map((film: string, index: number) => (
                      <li key={index}>{film}</li>
                    ))}
                  </ul>
                </div>
              )}
              {character.data.shortFilms.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Short Films</h2>
                  <ul className="list-disc ml-5">
                    {character.data.shortFilms.map(
                      (shortFilm: string, index: number) => (
                        <li key={index}>{shortFilm}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {character.data.tvShows.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">TV Shows</h2>
                  <ul className="list-disc ml-5">
                    {character.data.tvShows.map(
                      (tvShow: string, index: number) => (
                        <li key={index}>{tvShow}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href={character.data.sourceUrl} target="_blank">
              <Button variant="contained">
                Explore More Character Details
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
