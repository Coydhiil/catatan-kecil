export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

interface BlockNode {
    type?: string;
    children?: Array<{
        type?: string;
        text?: string;
    }>;
}

export function getSnippetFromBlocks(content: BlockNode[] | string | null | undefined, maxLength: number = 160): string {
    if (!content) return '';
    if (typeof content === 'string') {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        }
        return content;
    }
    if (!Array.isArray(content)) return '';
    let text = '';
    for (const node of content) {
        if (node.children) {
            for (const child of node.children) {
                if (child.text) {
                    text += child.text + ' ';
                }
            }
        }
        if (text.length >= maxLength) break;
    }
    text = text.trim();
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

export function getStrapiMediaUrl(url: string | undefined): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
    return `${strapiUrl}${url}`;
}

export async function getBlurDataURL(url: string): Promise<string | undefined> {
    if (!url) return undefined;
    try {
        const fullUrl = getStrapiMediaUrl(url);
        const res = await fetch(fullUrl, {
            next: { revalidate: 86400 }
        });
        if (!res.ok) {
            console.warn(`Gagal mengambil thumbnail untuk blur placeholder dari ${fullUrl}: ${res.statusText}`);
            return undefined;
        }
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeType = res.headers.get('content-type') || 'image/jpeg';
        return `data:${mimeType};base64,${buffer.toString('base64')}`;
    } catch (error) {
        console.error('Gagal membuat blurDataURL:', error);
        return undefined;
    }
}
