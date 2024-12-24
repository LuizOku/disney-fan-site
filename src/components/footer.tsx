import React from "react";
import Image from "next/image";
import getAllCharacters from "@/services/get-all-characters";
import Card from "./card";

const Footer = async () => {
  const characters = await getAllCharacters({ page: "1", name: "Feat" });

  return (
    <footer className="flex flex-col items-center justify-center bg-white px-10">
      <section className="bg-primary text-white py-8 flex flex-col items-center justify-center w-full">
        <h2 className="text-4xl mb-6">Featured Characters!</h2>
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {characters.data.slice(0, 4).map((character) => (
            <Card
              key={character._id}
              title={character.name}
              image={character.imageUrl}
              featuredFilms={[...character.films, ...character.shortFilms]}
              id={String(character._id)}
            />
          ))}
        </div>
      </section>
      <div className="flex flex-col items-center justify-center py-6 bg-white">
        <Image src="/logo.png" alt="Disney Logo" width={80} height={40} />
        <p className="text-black text-[10px] mt-2 text-center">
          For educational use only. All characters and content are the property
          of Disney. This test is for private use and development testing only
          and should not be distributed for public consumption.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
