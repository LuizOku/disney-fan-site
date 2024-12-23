import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center bg-white">
      <h1 className="text-2xl font-semibold tracking-tight text-black">
        Loading...
      </h1>
      <p className="text-sm text-black ">Please wait a moment.</p>
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
