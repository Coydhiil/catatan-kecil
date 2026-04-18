import Link from "next/link";

export default function Skills() {
    return (
    <div className="items-center justify-center flex flex-col bg-gray-400 h-full p-4">
      <h1 className="font-semibold text-xl">⭐Skills</h1>
      <div className="flex flex-wrap mt-5 gap-3">
        <div className="rounded-lg text-white bg-gray-800 p-2 text-sm font-semibold">
          <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
            HTML
          </Link>
        </div>
        <div className="rounded-lg text-white bg-gray-800 p-2 text-sm font-semibold">
          <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
            CSS
          </Link>
        </div>
        <div className="rounded-lg text-white bg-gray-800 p-2 text-sm font-semibold">
          <Link href="https://tailwindcss.com/" target="_blank">
            Tailwind
          </Link>
        </div>
        <div className="rounded-lg text-white bg-gray-800 p-2 text-sm font-semibold">
          <Link href="https://laravel.com/" target="_blank">
            Laravel
          </Link>
        </div>
        <div className="rounded-lg text-white bg-gray-800 p-2 text-sm font-semibold">
          <Link href="https://nextjs.org/" target="_blank">
            Next.js
          </Link>
        </div>
      </div>
    </div>
  );
}    