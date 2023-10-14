import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import 'devextreme/dist/css/dx.light.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pallets-stock',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ `dx-viewport ${inter.className}` } >{ children }</body>
    </html>
  )
}
