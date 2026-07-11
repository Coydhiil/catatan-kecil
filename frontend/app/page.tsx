import Link from 'next/link';
import { getAllArticles } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const articles = await getAllArticles();

    return (
        <main className="max-w-2xl mx-auto px-6 py-16 antialiased">
            <div className="relative border-b border-zinc-100 dark:border-zinc-800/80 pb-12 mb-16">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-2xl -z-10 pointer-events-none" />

                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl leading-none">
                    Catatan Kecil
                </h1>
                <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                    Berbagi cerita, tips seputar teknologi, tutorial pemrograman, dan catatan perjalanan belajar sehari-hari.
                </p>
            </div>

            {articles && articles.length > 0 ? (
                <div className="flex flex-col gap-10">
                    {articles.map((article) => {
                        const attrs = article.attributes || article;
                        return (
                            <article key={article.id || article.documentId} className="flex flex-col items-start border-b border-zinc-100 dark:border-zinc-800/80 pb-8 last:border-0 last:pb-0">
                                {attrs.createdAt && (
                                    <time className="text-xs font-semibold tracking-wide text-zinc-400 dark:text-zinc-500 mb-2 uppercase">
                                        {formatDate(attrs.createdAt)}
                                    </time>
                                )}
                                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                    <Link href={`/article/${attrs.Slug}`}>
                                        {attrs.Title}
                                    </Link>
                                </h2>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50 dark:bg-zinc-900/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                    <svg
                        className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-600 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2m-2 3h.01M5.5 8.5h.01M5.5 12h.01M5.5 16h.01"
                        />
                    </svg>
                    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Belum Ada Artikel</h3>
                </div>
            )}
        </main>
    );
}
