export interface StrapiArticle {
    id?: number | string;
    documentId?: string;
    Title?: string;
    Slug?: string;
    createdAt?: string;
    Content?: unknown;
    attributes?: {
        Title?: string;
        Slug?: string;
        createdAt?: string;
        Content?: unknown;
    };
}

const STRAPI_URL = process.env.STRAPI_API_URL;

export async function getAllArticles(): Promise<StrapiArticle[]> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
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
            `${STRAPI_URL}/api/articles?filters[Slug][$eq]=${slug}&populate=*`,
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