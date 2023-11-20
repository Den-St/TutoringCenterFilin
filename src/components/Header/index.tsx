'use client'
import { authorizationNavRoutes, headerNavRoutes } from "@/consts/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthorizationNav } from "./AuthorizationNav"
import { VideoCoursesNav } from "./VideoCoursesNav"
import { AboutUsSectionsNav } from "./AboutUsSectionsNav"
import { FreeProductsNav } from "./FreeProductsNav"
import { TestsNav } from "./TestsNav"

export const Header = () => {
    const pathname = usePathname();

    return <header className="w-full bg-blue-950 p-5 flex justify-around items-center h-20">
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
             {headerNavRoutes.home.route === pathname
                ? <Link className="underline text-white" key={headerNavRoutes.home.route} href={headerNavRoutes.home.route}>
                    {headerNavRoutes.home.title}
                </Link>
                : <Link key={headerNavRoutes.home.route} className="text-white" href={headerNavRoutes.home.route}>
                    {headerNavRoutes.home.title}
                </Link>}
            <VideoCoursesNav/>
            {headerNavRoutes.studyMaterials.route === pathname
                ? <Link className="underline text-white" key={headerNavRoutes.studyMaterials.route} href={headerNavRoutes.studyMaterials.route}>
                    {headerNavRoutes.studyMaterials.title}
                </Link>
                : <Link key={headerNavRoutes.studyMaterials.route} className="text-white" href={headerNavRoutes.studyMaterials.route}>
                    {headerNavRoutes.studyMaterials.title}
                </Link>}
            <TestsNav/>
            <FreeProductsNav/>
            <AboutUsSectionsNav/>
            {headerNavRoutes.events.route === pathname
                ? <Link className="underline text-white" key={headerNavRoutes.events.route} href={headerNavRoutes.events.route}>
                    {headerNavRoutes.events.title}
                </Link>
                : <Link key={headerNavRoutes.events.route} className="text-white" href={headerNavRoutes.events.route}>
                    {headerNavRoutes.events.title}
                </Link>}
            {headerNavRoutes.teachers.route === pathname
                ? <Link className="underline text-white" key={headerNavRoutes.teachers.route} href={headerNavRoutes.teachers.route}>
                    {headerNavRoutes.teachers.title}
                </Link>
                : <Link key={headerNavRoutes.teachers.route} className="text-white" href={headerNavRoutes.teachers.route}>
                    {headerNavRoutes.teachers.title}
                </Link>}
        </nav>
        <AuthorizationNav pathname={pathname}/>
    </header>
}