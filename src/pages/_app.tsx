import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { AppProps } from "next/app";
import ConfirmDialog from "@/components/Dialog/ConfirmDialog";
import { Toaster } from "react-hot-toast";

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
                <ConfirmDialog />
                <Toaster
                    containerClassName={`${inter.className} capitalize font-semibold`}
                    position="top-center"
                    gutter={4}
                    reverseOrder
                />
            </main>
        </>
    );
}
