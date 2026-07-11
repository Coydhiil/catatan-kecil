export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-100 dark:border-zinc-800 mt-20 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div>
                    &copy; {currentYear} Fadhiil Fiannata N. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <a href="https://github.com/Coydhiil" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition" target="blank">GitHub</a>
                    <a href="https://www.linkedin.com/in/fadhiil-fiannata-nugroho-24a300385/" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition" target="blank">Linkedin</a>
                </div>
            </div>
        </footer>
    );
}
