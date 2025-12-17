import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 SEO 核心配置区
export const metadata: Metadata = {
  // 1. 网页标题 (包含核心关键词)
  title: "Free Etsy Description Generator | AI Listing Tool for Sellers",

  // 2. 网页描述 (出现在搜索结果的灰色小字中，吸引点击)
  description: "Boost your Etsy sales with our free AI listing generator. Create SEO-optimized titles, tags, and product descriptions in seconds. No signup required.",

  // 3. 关键词 (给搜索引擎的线索)
  keywords: [
    "Etsy description generator",
    "Etsy listing tool",
    "Etsy SEO helper",
    "Etsy tag generator",
    "AI product description writer",
    "Free Etsy tools"
  ],

  // 4. 作者与应用信息
  authors: [{ name: "EtsyListing.ai" }],
  creator: "EtsyListing.ai",

  // 5. Open Graph (社交媒体分享卡片 - 当你发到 Reddit 时显示的预览)
  openGraph: {
    title: "Free Etsy Description Generator",
    description: "Write Etsy listings 10x faster with AI. Titles, Tags & Descriptions.",
    type: "website",
    locale: "en_US",
    siteName: "Etsy Listing Generator",
  },

  // 6. 图标
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-W47F65LX0F"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W47F65LX0F');
          `}
        </Script>
      </body>
    </html>
  );
}