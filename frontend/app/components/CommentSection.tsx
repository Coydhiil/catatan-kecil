"use client";

import { useState } from 'react';

interface Comment {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    avatarUrl?: string;
}

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            author: 'Ahmad Fauzi',
            content: 'Semangat terus bang!!',
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        },
        {
            id: '2',
            author: 'Budi Santoso',
            content: 'Penjelasannya mudah dipahami. Ditunggu artikel selanjutnya ya, Kak!"',
            createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
            avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        }
    ]);

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!author.trim() || !content.trim()) {
            setError('Nama dan isi komentar tidak boleh kosong.');
            return;
        }

        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const newComment: Comment = {
            id: Date.now().toString(),
            author: author.trim(),
            content: content.trim(),
            createdAt: new Date().toISOString(),
            avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        };

        setComments([newComment, ...comments]);
        setAuthor('');
        setContent('');
        setIsSubmitting(false);
    };

    const formatDateComment = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section className="mt-16 pt-10 border-t border-zinc-100 dark:border-zinc-800/80">
            <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight mb-8 flex items-center gap-2">
                <span>Kolom Komentar</span>
                <span className="text-sm font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                    {comments.length}
                </span>
            </h3>

            <form onSubmit={handleSubmit} className="mb-10 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/30 via-transparent to-blue-50/30 dark:from-indigo-950/5 dark:to-blue-950/5 pointer-events-none" />

                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4">Tinggalkan Komentar</h4>

                {error && (
                    <div className="mb-4 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl px-4 py-3">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label htmlFor="name-input" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                            Nama Lengkap
                        </label>
                        <input
                            id="name-input"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Contoh: Jane Doe"
                            className="w-full text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="comment-input" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                            Komentar
                        </label>
                        <textarea
                            id="comment-input"
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tulis pendapat atau pertanyaan Anda di sini..."
                            className="w-full text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 resize-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Mengirim...
                            </>
                        ) : (
                            <span>Kirim Komentar</span>
                        )}
                    </button>
                </div>
            </form>

            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-center py-10 text-zinc-400 dark:text-zinc-500 text-sm">
                        Belum ada komentar. Jadilah yang pertama memberikan tanggapan!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl hover:border-zinc-200 dark:hover:border-zinc-850 hover:shadow-sm transition-all duration-200"
                        >
                            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img
                                    src={comment.avatarUrl}
                                    alt={comment.author}
                                    className="h-full w-full object-cover grayscale opacity-80"
                                    width={40}
                                    height={40}
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                    <h5 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
                                        {comment.author}
                                    </h5>
                                    <time className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                                        {formatDateComment(comment.createdAt)}
                                    </time>
                                </div>
                                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-450 whitespace-pre-line">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
