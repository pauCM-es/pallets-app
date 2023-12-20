import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
// import '@/styles/root.scss'
import 'devextreme/dist/css/dx.fluent.saas.dark.compact.css'
// import '@/styles/dx.material.black-white-dark-scheme.css'



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
      <body
        className={ `dx-viewport ${inter.className}` }
        data-theme="dark"
      >{ children }</body>
    </html>
  )
}
