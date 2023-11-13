'use client'
import { authorizationNavRoutes, headerNavRoutes } from "@/consts/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthorizationNav } from "./AuthorizationNav"
import { VideoCoursesNav } from "./VideoCoursesNav"
import { AboutUsSectionsNav } from "./AboutUsSectionsNav"
import { FreeProductsNav } from "./FreeProductsNav"

export const Header = () => {
    const pathname = usePathname();

    return <header className="w-full bg-blue-950 p-5 flex justify-around items-center">
        <nav aria-label="content navigation" className="flex gap-3">
            {/* {Object.keys(headerNavRoutes).map(navKey => 
                pathname === headerNavRoutes[navKey].route
                ? <Link className="underline text-white" key={navKey} href={headerNavRoutes[navKey].route}>
                    {headerNavRoutes[navKey].title}
                </Link>
                : <Link key={navKey} className="text-white" href={headerNavRoutes[navKey].route}>
                    {headerNavRoutes[navKey].title}
                </Link>
            )} */}
             {headerNavRoutes.home.route.includes(pathname)
                ? <Link className="underline text-white" key={headerNavRoutes.home.route} href={headerNavRoutes.home.route}>
                    {headerNavRoutes.home.title}
                </Link>
                : <Link key={headerNavRoutes.home.route} className="text-white" href={headerNavRoutes.home.route}>
                    {headerNavRoutes.home.title}
                </Link>}
            <VideoCoursesNav/>
            {headerNavRoutes.studyMaterials.route.includes(pathname)
                ? <Link className="underline text-white" key={headerNavRoutes.studyMaterials.route} href={headerNavRoutes.studyMaterials.route}>
                    {headerNavRoutes.studyMaterials.title}
                </Link>
                : <Link key={headerNavRoutes.studyMaterials.route} className="text-white" href={headerNavRoutes.studyMaterials.route}>
                    {headerNavRoutes.studyMaterials.title}
                </Link>}
            <AboutUsSectionsNav/>
            <FreeProductsNav/>
        </nav>
        <AuthorizationNav pathname={pathname}/>
    </header>
}