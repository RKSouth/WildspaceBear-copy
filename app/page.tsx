import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col mt-20 items-center">
        <Image
          width={512}
          height={512}
          src="/logo.png"
          alt="Platforms on Vercel"
          className="w-48 h-48"
        />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-300 font-bold text-6xl">Wild Space Bear</h1>
          <p className="text-stone-400 mt-5">
            Search, Save and Categorize scientific research
          </p>
        </div>
        <div className="flex space-x-3 text-2xl">
          <p className="text-white">·</p>
          <Link
            href="/protected"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Login/Signup
          </Link>
          <p className="text-white">·</p>
        </div>
      </div>
    </div>
  );
}
