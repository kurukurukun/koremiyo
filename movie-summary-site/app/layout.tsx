import type { Metadata } from "next";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "コレミヨ (KOREMIYO) - 今日の映画選びを絶対に外さない",
  description: "「今日の映画選びを絶対に外さない」歴代アカデミー賞受賞作や高評価の超名作だけを厳選して紹介する映画おすすめサイト「KOREMIYO(コレミヨ)」。AmazonプライムやU-NEXTなどの配信状況も一目で分かります。",
  openGraph: {
    title: "コレミヨ (KOREMIYO)",
    description: "今日の映画選びを絶対に外さない。アカデミー賞受賞作や高評価の名作だけを厳選。",
    type: "website",
    url: "https://www.koremiyo.com/",
    images: [
      {
        url: "https://www.koremiyo.com/assets/ogp-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Noto+Sans+JP:wght@300;400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <meta name="google-site-verification" content="JOYD23xCXOri_xkZMkUUVC-TPlte56evxDIOvGuF42I" />
      </head>
      <body>
        {/* SEO用の隠しh1タグ */}
        <h1 style={{ display: 'none' }}>映画おすすめサイト コレミヨ(KOREMIYO) - 絶対に外さない映画選び</h1>
        <Suspense fallback={null}>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        </Suspense>
        {children}
        {modal}
      </body>
    </html>
  );
}
