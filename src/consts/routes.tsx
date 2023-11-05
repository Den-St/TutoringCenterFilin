import { navRoutesType } from "@/types/routes";

export const routes = {
    home:'/',
    videoCourses:(id:string) => `/video-courses/${id}`,
    tests:'/tests',
    aboutUs:(id:string) => `/about-us/${id}`,
    registration:'/registration',
    logIn:'/log-in',
} as const;

export const headerNavRoutes:Record<string,navRoutesType> = {
    home:{
        title:'Головна',
        route:routes.home,
    },
    // videoCourses:{
    //     title:'Відеокурси',
    //     route:routes.videoCourses,
    // },
    tests:{
        title:'Тести',
        route:routes.tests,
    },
    // aboutUs:{
    //     title:'Про нас',
    //     route:routes.aboutUs,
    // }
} as const;

export const authorizationNavRoutes:Record<string,navRoutesType> = {
    registration:{
        title:'Реєстрація',
        route:routes.registration,
    },
    logIn:{
        title:'Увійти',
        route:routes.logIn
    }
} as const;