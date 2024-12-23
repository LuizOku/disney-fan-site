"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error(error.message);
    }
  }, [error]);

  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center bg-white">
      <h1 className="text-2xl font-semibold tracking-tight text-black">
        Something went wrong!
      </h1>
      <p className="text-sm text-black ">
        {(error as Error)?.message ?? "Please, try again"}
      </p>

      <Image
        src="/logo.png"
        width={120}
        height={40}
        alt="Disney"
        className="mt-5"
      />
    </div>
  );
}
