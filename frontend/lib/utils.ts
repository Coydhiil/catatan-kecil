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

