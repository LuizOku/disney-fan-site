"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "./input";
import { debounce } from "@/utils/debounce";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams?.get("name") || "");
  const router = useRouter();

  const updateQueryParam = debounce((value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (!value) {
      params.delete("name");
    } else {
      params.set("name", value);
    }
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    updateQueryParam(value);
  };

  return (
    <header className="flex items-center justify-between py-4 gap-4 bg-white">
      <Link href="/">
        <Image src="/logo.png" alt="Disney" width={100} height={50} />
      </Link>
      <Input
        type="text"
        placeholder="Find a character..."
        className="flex-1"
        value={search}
        onChange={handleInputChange}
      />
      <Link href="/user">
        <Image
          className="w-10 h-10 rounded-full cursor-pointer"
          src="/avatar.png"
          alt="User"
          width={40}
          height={40}
        />
      </Link>
    </header>
  );
};

export default Header;
