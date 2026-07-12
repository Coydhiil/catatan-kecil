import Link from 'next/link';
import Image from 'next/image';
import { StrapiArticle } from '@/lib/strapi';
import { formatDate, getSnippetFromBlocks, getStrapiMediaUrl } from '@/lib/utils';

interface RelatedArticlesProps {
    currentSlug: string;
    articles: StrapiArticle[];
}

export default function RelatedArticles({ currentSlug, articles }: RelatedArticlesProps) {
    // Filter out the current article and get at most 3 articles
    const related = articles
        .filter((art) => {
            const attrs = art.attributes || art;
            return attrs.Slug !== currentSlug;
        })
        .slice(0, 3);

    if (related.length === 0) {
        return null;
    }

    const getCoverImageUrl = (article: StrapiArticle) => {
        const attrs = article.attributes || article;
        const cover = attrs.CoverImage;
        if (!cover) return null;

        if (Array.isArray(cover)) {
            if (cover.length === 0) return null;
            return cover[0].formats?.thumbnail?.url || cover[0].url;
        }
        return cover.formats?.thumbnail?.url || cover.url;
    };

    const getCoverImageAlt = (article: StrapiArticle) => {
        const attrs = article.attributes || article;
        const cover = attrs.CoverImage;
        if (!cover) return '';

        if (Array.isArray(cover)) {
            if (cover.length === 0) return '';
            return cover[0].alternativeText || attrs.Title || '';
        }
        return cover.alternativeText || attrs.Title || '';
    };

    return (
        <section className="mt-16 pt-10 border-t border-zinc-100 dark:border-zinc-800/80">
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight mb-6">
                Rekomendasi Artikel Terkait
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((article) => {
                    const attrs = article.attributes || article;
                    const { Title, Slug, createdAt, Content } = attrs;
                    const snippet = getSnippetFromBlocks(Content as any, 75);
                    const thumbnailUrl = getCoverImageUrl(article);
                    const altText = getCoverImageAlt(article);

                    return (
                        <article
                            key={article.id || article.documentId}
                            className="group flex flex-col bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-zinc-200/40 dark:hover:shadow-none hover:border-zinc-250 dark:hover:border-zinc-700/80 transition-all duration-300"
                        >
                            <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                {thumbnailUrl ? (
                                    <Image
                                        src={getStrapiMediaUrl(thumbnailUrl)}
                                        alt={altText}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-950/20 dark:to-indigo-950/20 flex items-center justify-center p-4">
                                        <span className="text-2xl font-bold text-blue-500/20 dark:text-blue-400/10 select-none truncate max-w-full">
                                            {Title}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 flex-grow flex flex-col">
                                {createdAt && (
                                    <time
                                        dateTime={createdAt}
                                        className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase mb-1.5 block"
                                    >
                                        {formatDate(createdAt)}
                                    </time>
                                )}
                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    <Link href={`/article/${Slug}`}>
                                        {Title}
                                    </Link>
                                </h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mt-auto">
                                    {snippet || 'Baca selengkapnya mengenai artikel ini.'}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
