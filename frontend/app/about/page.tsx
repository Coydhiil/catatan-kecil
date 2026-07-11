import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/strapi';
import { getSnippetFromBlocks } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const articles = await getAllArticles();
    const recentArticles = articles.slice(0, 3);
    return (
        <main className="max-w-2xl mx-auto px-6 py-16 antialiased">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16">
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
                        Halo! Selamat datang di <span className="text-blue-400">CatatanKecil.</span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed">
                        Saya <strong>Fadhiil Fiannata N,</strong> seorang antusias teknologi yang suka analisa data, ngulik framework web modern, dan mendokumentasikan proses belajarnya saya.
                    </p>
                </div>
                <div className="flex justify-center md:justify-end">
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-25 blur-sm transition duration-500 group-hover:opacity-40" />
                        <div className="relative h-44 w-44 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900">
                            <Image
                                src="/Fadhiil FN.webp"
                                alt="Fadhiil Fiannata"
                                fill
                                sizes="176px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-zinc-100 dark:border-zinc-800/80 pt-12 mb-16">
                <div className="max-w-xl mx-auto space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                        Cerita di Balik Layar
                    </h2>
                    <p>
                        Dunia teknologi berkembang begitu pesat, hari ini kita mempelajari suatu library, esok hari sudah ada trend baru yang menggantikannya. Kadang kala, proses belajar ini terasa melelahkan dan penuh dengan kegelisahan.
                    </p>
                    <p>
                        Itulah alasan saya memulai blog ini. Saya ingin mendokumentasikan setiap 'eureka moment', error aneh yang berhasil dipecahkan, hingga catatan sederhana tentang dasar-dasar pemrograman yang sering terlupakan.
                    </p>

                    <blockquote className="relative my-8 py-4 pl-6 border-l-4 border-blue-500 bg-zinc-50 dark:bg-zinc-900/30 rounded-r-xl">
                        <p className="text-lg font-medium italic text-zinc-800 dark:text-zinc-200">
                            "Menulis adalah cara terbaik untuk merapikan isi kepala. Dan membagikannya adalah cara terbaik untuk melipatgandakan manfaatnya."
                        </p>
                    </blockquote>

                    <p>
                        Melalui tulisan-tulisan di sini, saya berharap bisa membantu Anda yang mungkin sedang mengalami kendala yang sama saat belajar pemrograman, atau sekadar ingin bertukar pikiran tentang masa depan dunia web development.
                    </p>
                </div>
            </section>

            {recentArticles.length > 0 && (
                <section className="border-t border-zinc-100 dark:border-zinc-800/80 pt-12 mb-16">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight mb-8">
                        Apa yang Bisa Dibaca?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recentArticles.map((article) => {
                            const attrs = article.attributes || article;
                            const snippet = getSnippetFromBlocks(attrs.Content as any, 100);
                            return (
                                <div key={article.id || article.documentId} className="group relative flex flex-col p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:shadow-lg hover:border-zinc-200 dark:hover:border-zinc-700/80 transition-all duration-300">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-950/5 dark:to-indigo-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {attrs.Title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed flex-grow line-clamp-3">
                                        {snippet || 'Baca selengkapnya mengenai artikel ini.'}
                                    </p>
                                    <Link href={`/article/${attrs.Slug}`} className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-auto">
                                        Mulai Membaca →
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className="border-t border-zinc-100 dark:border-zinc-800/80 pt-12">
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-8 text-center space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                            Yuk, Saling Berbagi Cerita!
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                            Punya pertanyaan, ide kolaborasi, atau cuma pengen ngobrol topik coding? Yuk, sapa saya di media sosial!
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                        <a
                            href="https://github.com/Coydhiil"
                            className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/fadhiil-fiannata-nugroho-24a300385/"
                            className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:fadhiil.fiannata@gmail.com"
                            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition"
                        >
                            Email Saya
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}