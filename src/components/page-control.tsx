"use client";
import { debounce } from "@/utils/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Button from "./button";

interface PageControlProps {
  totalPages: number;
}

const PageControl = ({ totalPages }: PageControlProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );

  const updateQueryParam = debounce((value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", value);

    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    updateQueryParam(String(currentPage + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    updateQueryParam(String(currentPage - 1));
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {currentPage > 1 && (
        <Button variant="outlined" onClick={handlePrev} className="w-28">
          Previous
        </Button>
      )}
      <span className="text-black font-bold">Page {currentPage}</span>
      {currentPage < totalPages && (
        <Button variant="contained" onClick={handleNext} className="w-28">
          Next
        </Button>
      )}
    </div>
  );
};

export default PageControl;
