import React from "react";
import Image from "next/image";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";

interface CardProps {
  title: string;
  image: string;
  featuredFilms: string[];
  id: string;
}

const Card = ({ title, image, featuredFilms, id }: CardProps) => {
  return (
    <div className="w-60 rounded overflow-hidden shadow-lg bg-white">
      <Image
        className="w-full h-60 object-cover"
        src={image ?? "/logo.png"}
        alt={title}
        width={160}
        height={240}
      />
      <div className="px-6 py-4 flex flex-col items-center h-56">
        <div className="font-bold text-xl mb-2 text-black text-center">
          {title}
        </div>
        {featuredFilms.length > 0 && (
          <>
            <span className="text-black font-bold text-base mt-3">
              Featured Films:
            </span>
            <p className="text-black text-center text-base">
              {truncateText(featuredFilms.join(", "), 50)}
            </p>
          </>
        )}
        <Link
          href={`/character/${id}`}
          className="text-black font-bold text-sm text-center underline mt-auto mb-0"
        >
          VIEW PROFILE
        </Link>
      </div>
    </div>
  );
};

export default Card;
