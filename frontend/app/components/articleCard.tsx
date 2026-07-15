import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getSnippetFromBlocks, getStrapiMediaUrl } from '@/lib/utils';
import { StrapiArticle } from '@/lib/strapi';

interface ArticleCardProps {
    article: StrapiArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const attrs = article.attributes || article;
    const { Title, Slug, createdAt, Content, Headline } = attrs;
    const snippet = getSnippetFromBlocks(Content as any, 120);

    const getCoverImageUrl = () => {
        const cover = attrs.CoverImage;
        if (!cover) return null;

        if (Array.isArray(cover)) {
            if (cover.length === 0) return null;
            return cover[0].formats?.thumbnail?.url || cover[0].url;
        }
        return cover.formats?.thumbnail?.url || cover.url;
    };

    const thumbnailUrl = getCoverImageUrl();

    return (
        <article className="group relative flex flex-col md:flex-row gap-6 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-6 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none hover:border-zinc-200 dark:hover:border-zinc-700/80 transition-all duration-300">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative w-full md:w-44 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50 flex-shrink-0">
                {thumbnailUrl ? (
                    <Image
                        src={getStrapiMediaUrl(thumbnailUrl)}
                        alt={Headline || Title || 'Cover Thumbnail'}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className="object-cover transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-950/20 dark:to-indigo-950/20 flex items-center justify-center p-4">
                        <span className="text-xl font-extrabold text-blue-500/20 dark:text-blue-400/10 select-none truncate max-w-full">
                            {Headline ? Headline[0] : (Title ? Title[0] : 'B')}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div>
                    {createdAt && (
                        <time
                            dateTime={createdAt}
                            className="relative z-10 flex items-center text-xs font-semibold tracking-wide text-zinc-400 dark:text-zinc-500 mb-3 uppercase"
                        >
                            <span className="h-3 w-0.5 rounded-full bg-blue-500 dark:bg-blue-400 mr-2" />
                            {formatDate(createdAt)}
                        </time>
                    )}
                    <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mt-1 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        <Link href={`/article/${Slug}`}>
                            <span className="absolute -inset-y-0.5 -inset-x-4 z-20 rounded-2xl sm:-inset-x-6" />
                            <span className="relative z-10">{Headline || Title}</span>
                        </Link>
                    </h2>
                    <p className="relative z-10 text-sm text-zinc-650 dark:text-zinc-450 leading-relaxed mb-4 flex-grow line-clamp-3">
                        {snippet || 'Baca selengkapnya mengenai artikel ini.'}
                    </p>
                </div>

                <div className="relative z-10 mt-auto flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Baca Selengkapnya
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="ml-1 h-4 w-4 stroke-current transition-transform duration-200 group-hover:translate-x-1"
                    >
                        <path
                            d="M6.75 5.75 9.25 8l-2.5 2.25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </article>
    );
}
