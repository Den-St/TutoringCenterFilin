'use client'
import { adminNavRoutes, authorizationNavRoutes, headerNavRoutes } from "@/consts/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthorizationNav } from "./AuthorizationNav"

export const Header = () => {
    const pathname = usePathname();

    return <header className="w-full bg-green-100 p-5 flex justify-around ">
        <nav aria-label="content navigation" className="flex gap-3">
            {Object.keys(headerNavRoutes).map(navKey => 
                pathname === headerNavRoutes[navKey].route
                ? <Link className="underline" key={navKey} href={headerNavRoutes[navKey].route}>
                    {headerNavRoutes[navKey].title}
                </Link>
                : <Link key={navKey} href={headerNavRoutes[navKey].route}>
                    {headerNavRoutes[navKey].title}
                </Link>
            )}
        </nav>
        <AuthorizationNav pathname={pathname}/>
    </header>
}