import { Header } from '@/components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Репетиторський центр Філін',
  description: 'Сайт репетиторського центру Філін',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='flex flex-col'>
        <Header/>
        <div className='p-14 bg-slate-400 min-w-screen min-h-screen'>
          {children}
        </div>
      </div>
}
