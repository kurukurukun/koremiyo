import type { Metadata } from "next";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const baseUrl = 'https://www.koremiyo.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "コレミヨ (KOREMIYO) - 今日の映画選びを絶対に外さない映画おすすめサイト",
    template: "%s | コレミヨ (KOREMIYO)"
  },
  description: "「今日の映画選びを絶対に外さない」歴代アカデミー賞作品賞・短編賞、ゴールデングローブ賞など、世界中で絶賛された超名作だけを厳選紹介する映画おすすめサイト「KOREMIYO(コレミヨ)」。Amazonプライム・ビデオやU-NEXTなどの動画配信サービス（VOD）の配信状況や評価スコアも一目で分かります。",
  keywords: ["映画おすすめ", "名作映画", "アカデミー賞", "アカデミー短編映画賞", "ゴールデングローブ賞", "アマプラおすすめ", "U-NEXT", "映画評価", "感動映画", "コレミヨ", "KOREMIYO"],
  authors: [{ name: "KOREMIYO編集部" }],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "コレミヨ (KOREMIYO) - 今日の映画選びを絶対に外さない",
    description: "歴代アカデミー賞受賞作や高評価の超名作だけを厳選。AmazonプライムやU-NEXT等の配信状況もすぐわかる映画おすすめサイト。",
    type: "website",
    url: baseUrl,
    siteName: "コレミヨ (KOREMIYO)",
    locale: "ja_JP",
    images: [
      {
        url: `${baseUrl}/assets/ogp-image.png`,
        width: 1200,
        height: 630,
        alt: "コレミヨ (KOREMIYO) 映画おすすめサイト",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "コレミヨ (KOREMIYO) - 今日の映画選びを絶対に外さない",
    description: "歴代アカデミー賞受賞作や高評価の超名作映画を厳選紹介。VOD配信情報も一覧で確認できます。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "コレミヨ (KOREMIYO)",
    "alternateName": "KOREMIYO",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Noto+Sans+JP:wght@300;400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <meta name="google-site-verification" content="JOYD23xCXOri_xkZMkUUVC-TPlte56evxDIOvGuF42I" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {/* SEO */}
        <Suspense fallback={null}>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        </Suspense>
        {children}
        {modal}
      </body>
    </html>
  );
}
