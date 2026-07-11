import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
            <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-zinc-800 dark:text-zinc-100 hover:text-blue-600 transition">
                    CatatanKecil.
                </Link>
                <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <Link href="/" className="hover:text-blue-600 transition">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 transition">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
