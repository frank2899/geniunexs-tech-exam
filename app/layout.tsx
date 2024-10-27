import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from '@/lib/providers/Providers'
import RootLayoutComponent from '@/components/RootLayout'

const geistSans = localFont({
    src: '../assets/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: '../assets/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Geniunexs-tech-exam',
    description: 'Technical Exam',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Providers>
                    <RootLayoutComponent>{children}</RootLayoutComponent>
                </Providers>
            </body>
        </html>
    )
}
