"use server";

const STRAPI_URL = process.env.STRAPI_API_URL;

export async function createCommentAction(
    articleId: number | string,
    author: string,
    content: string
) {
    if (!author.trim() || !content.trim()) {
        throw new Error("Nama dan isi komentar tidak boleh kosong.");
    }

    const commentBlocks = [
        {
            type: "paragraph",
            children: [
                {
                    type: "text",
                    text: content.trim(),
                },
            ],
        },
    ];

    try {
        const response = await fetch(`${STRAPI_URL}/api/comment-sections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    Name: author.trim(),
                    Comment: commentBlocks,
                    article: articleId,
                },
            }),
        });

        if (!response.ok) {
            const errBody = await response.json().catch(() => ({}));
            console.error("Strapi POST comment-sections error:", errBody);
            throw new Error("Gagal mengirim komentar ke server.");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error in createCommentAction:", error);
        throw error;
    }
}
