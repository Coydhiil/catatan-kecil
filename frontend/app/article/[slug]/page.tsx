import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
export const dynamic = 'force-dynamic';
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) {
        notFound();
    }
    const attrs = article.attributes || article;
    return (
        <main className="max-w-2xl mx-auto px-6 py-16 antialiased">
            <div className="mb-8">
                <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-blue-600 transition flex items-center gap-1">
                    ← Kembali ke beranda
                </Link >
            </div >
            <header className="mb-10">
                {attrs.createdAt && (
                    <time className="text-sm text-zinc-400 dark:text-zinc-500 block mb-3">
                        Diterbitkan pada {formatDate(attrs.createdAt)}
                    </time>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 leading-tight">
                    {attrs.Title}
                </h1>
            </header >
            <div className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed text-zinc-700 dark:text-zinc-300">
                {!!attrs.Content && <BlocksRenderer content={attrs.Content as any} />}
            </div>
        </main >
    );
}