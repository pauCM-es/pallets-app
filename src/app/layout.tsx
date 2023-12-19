import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
// import '@/styles/root.scss'
import 'devextreme/dist/css/dx.material.teal.dark.compact.css'



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
      <head>
        <link rel="dx-theme" data-theme="material.light.compact" href="%PUBLIC_URL%dx.material.teal.light.compact.css" data-active="false" />
        <link rel="dx-theme" data-theme="material.dark.compact" href="%PUBLIC_URL%/dx.material.teal.dark.compact.css" data-active="true" />
      </head>
      <body
        className={ `dx-viewport ${inter.className}` }
        data-theme="dark"
      >{ children }</body>
    </html>
  )
}
