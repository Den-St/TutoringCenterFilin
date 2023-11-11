import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './../../components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Репетиторський центр Філін - Авторизація',
  description: 'Сайт репетиторського центру Філін',
}

export default function AuthorizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
      <Header/>
      <div className='flex justify-center p-14 bg-slate-400 min-w-screen min-h-screen'>{children}</div>
    </>
}
