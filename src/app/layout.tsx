import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ブロックエディタ",
  description: "Notion風のブロックエディタ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="overflow-hidden">
      <body>{children}</body>
    </html>
  )
}
