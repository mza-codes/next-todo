import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Quicksand({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <main className={`min-h-[100dvh] bg-white/80 p-4 ${inter.className}`}>
                <Component {...pageProps} />
            </main>
        </>
    );
}
