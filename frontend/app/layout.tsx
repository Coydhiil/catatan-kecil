import type { Metadata } from "next";

import "./globals.css";
export const metadata: Metadata = {
  title: "Blog Pribadi Saya",
  description: "Tempat berbagi tutorial teknologi dan cerita pengalaman hidup.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 min-h-screen flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
