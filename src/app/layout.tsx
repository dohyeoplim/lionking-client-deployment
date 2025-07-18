import type { Metadata } from "next";
import "./globals.css";
import { Pretendard } from "@/fonts/loadFonts";
import NextTopLoader from "nextjs-toploader";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/Toast";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
                className={`${Pretendard.className} min-h-[100vh] flex flex-col overflow-x-hidden break-keep`}
            >
                <NextTopLoader color="#FF7710" showSpinner={false} height={1} zIndex={50000} />
                <Header />
                <main role="main" className="flex-1">
                    {children}
                </main>
                <Toaster />
                <Footer />
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: {
        default: "서울과학기술대학교 멋쟁이사자처럼",
        template: "%s | 서울과학기술대학교 멋쟁이사자처럼",
    },
    description: "서울과학기술대학교 멋쟁이사자처럼 대학 홈페이지입니다.",
    openGraph: {
        type: "website",
        locale: "ko_KR",
    },
};
