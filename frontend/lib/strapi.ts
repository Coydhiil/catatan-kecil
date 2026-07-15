export interface StrapiMediaFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes?: number;
}

export interface StrapiMedia {
    id: number;
    documentId?: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: StrapiMediaFormat;
        small?: StrapiMediaFormat;
        medium?: StrapiMediaFormat;
        large?: StrapiMediaFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
}

export interface StrapiComment {
    id: number | string;
    documentId?: string;
    Name: string;
    Comment: unknown;
    createdAt: string;
    attributes?: {
        Name: string;
        Comment: unknown;
        createdAt: string;
    };
}

export interface StrapiArticle {
    id: number | string;
    documentId?: string;
    Title?: string;
    Slug?: string;
    createdAt?: string;
    Content?: unknown;
    Headline?: string;
    Featured?: boolean;
    CoverImage?: StrapiMedia | StrapiMedia[] | null;
    comment_sections?: StrapiComment[] | null;
    attributes?: {
        Title?: string;
        Slug?: string;
        createdAt?: string;
        Content?: unknown;
        Headline?: string;
        Featured?: boolean;
        CoverImage?: StrapiMedia | StrapiMedia[] | null;
        comment_sections?: {
            data?: StrapiComment[];
        } | StrapiComment[] | null;
    };
}

const STRAPI_URL = process.env.STRAPI_API_URL;

export async function getAllArticles(): Promise<StrapiArticle[]> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/articles?populate=CoverImage`, {
            cache: "no-store",
        });

        if (!response.ok) throw new Error("Gagal mengambil data article");

        const data = await response.json();
        return (data.data as StrapiArticle[]) || [];
    } catch (error) {
        console.error("Error Strapi Fetch:", error);
        return [];
    }
}

export async function getArticleBySlug(slug: string): Promise<StrapiArticle | null> {
    try {
        const response = await fetch(
            `${STRAPI_URL}/api/articles?filters[Slug][$eq]=${slug}&populate[0]=CoverImage&populate[1]=comment_sections`,
            { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Gagal mengambil detail artikel');

        const data = await response.json();

        return data.data.length > 0 ? (data.data[0] as StrapiArticle) : null;
    } catch (error) {
        console.error("Error Strapi Fetch Slug:", error);
        return null;
    }
}