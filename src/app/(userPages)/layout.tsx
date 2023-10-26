import { Header } from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='flex flex-col'>
        <Header/>
        {children}
      </div>
}
