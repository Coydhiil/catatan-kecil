import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center shadow-md shadow-gray-400 px-4 py-6 bg-gray-800 text-white">
            <Link href="/">
                <h1 className="text-xl font-bold">Fianytho.</h1>
            </Link>
            <div className="flex flex-row gap-8">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <Link href="/projects">
                    <p>Projects</p>
                </Link>
            </div>
        </div>
    );
}