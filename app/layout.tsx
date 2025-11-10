import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { VisitorCounter } from "@/components/visitor-counter"
import "./globals.css"

const _notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "2年D組 徳田 太祐｜生徒会立候補",
  description: "校則を強制から納得へ。学校を管理から協力へ。",
  generator: "Tisk",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${_notoSansJP.className} font-sans antialiased bg-background text-foreground transition-colors`}
      >
        <VisitorCounter />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
