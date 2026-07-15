import Link from 'next/link';
import Image from 'next/image';
import nextDynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/strapi';
import { formatDate, getStrapiMediaUrl, getBlurDataURL } from '@/lib/utils';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export const dynamic = 'force-dynamic';

const CommentSection = nextDynamic(() => import('@/app/components/CommentSection'), {
    loading: () => (
        <div className="mt-16 pt-10 border-t border-zinc-150 dark:border-zinc-800/80 animate-pulse">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-1/4 rounded mb-6" />
            <div className="h-32 bg-zinc-100/50 dark:bg-zinc-900/30 rounded-2xl" />
        </div>
    ),
});

const RelatedArticles = nextDynamic(() => import('@/app/components/RelatedArticles'), {
    loading: () => (
        <div className="mt-16 pt-10 border-t border-zinc-150 dark:border-zinc-800/80 animate-pulse">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-1/3 rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-44 bg-zinc-100/50 dark:bg-zinc-900/30 rounded-2xl" />
                ))}
            </div>
        </div>
    ),
});

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [article, allArticles] = await Promise.all([
        getArticleBySlug(slug),
        getAllArticles()
    ]);

    if (!article) {
        notFound();
    }

    const attrs = article.attributes || article;
    const commentsData = attrs.comment_sections;
    let initialComments: any[] = [];
    if (commentsData) {
        initialComments = Array.isArray(commentsData) ? commentsData : ((commentsData as any).data || []);
    }
    const coverImageField = attrs.CoverImage;

    let coverUrl = '';
    let blurUrl = '';
    let altText = '';
    let imgWidth = 1200;
    let imgHeight = 630;

    if (coverImageField) {
        const cover = Array.isArray(coverImageField) ? coverImageField[0] : coverImageField;
        if (cover) {
            coverUrl = cover.url;
            altText = cover.alternativeText || attrs.Title || 'Cover Image';
            imgWidth = cover.width || imgWidth;
            imgHeight = cover.height || imgHeight;

            const thumbnailUrl = cover.formats?.thumbnail?.url || cover.formats?.small?.url || cover.url;
            if (thumbnailUrl) {
                const base64Blur = await getBlurDataURL(thumbnailUrl);
                if (base64Blur) {
                    blurUrl = base64Blur;
                }
            }
        }
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-16 antialiased">
            <div className="mb-8">
                <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-blue-600 transition flex items-center gap-1">
                    ← Kembali ke beranda
                </Link >
            </div >

            <header className="mb-8">
                {attrs.createdAt && (
                    <time className="text-sm text-zinc-400 dark:text-zinc-500 block mb-3 font-medium">
                        Diterbitkan pada {formatDate(attrs.createdAt)}
                    </time>
                )}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 leading-tight">
                    {attrs.Title}
                </h1>
            </header >

            {coverUrl && (
                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-10 shadow-md shadow-zinc-150/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/30">
                    <Image
                        src={getStrapiMediaUrl(coverUrl)}
                        alt={altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        placeholder={blurUrl ? "blur" : "empty"}
                        blurDataURL={blurUrl || undefined}
                        className="object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed text-zinc-700 dark:text-zinc-300">
                {!!attrs.Content && <BlocksRenderer content={attrs.Content as any} />}
            </div>

            <RelatedArticles currentSlug={slug} articles={allArticles} />

            <CommentSection articleId={article.documentId || article.id} initialComments={initialComments} />
        </main >
    );
}