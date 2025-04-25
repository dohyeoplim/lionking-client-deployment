import type { Metadata } from "next";
import "./globals.css";
import WithMockServer from "@/mocks/msw/WithMockServer";

// Components
import Header from "@/components/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="max-w-6xl mx-auto px-4">
                <Header />
                <main role="main">{children}</main>
                <WithMockServer />
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
