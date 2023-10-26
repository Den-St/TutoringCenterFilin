'use client'
import { AdminNavigation } from '@/adminComponents/AdminNavigation'
import { Header } from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='flex'>
        <AdminNavigation/>
        {children}
    </div>
}
