import { navRoutesType } from "@/types/routes";

export const routes = {
    home:'/',
    videoCourses:'/video-courses',
    tests:'/tests',
    aboutUs:'/about-us',
    registration:'/registration',
    logIn:'/log-in',

    //admin
    adminClasses:'/admin/classes',
    adminCourses:'/admin/courses',
    adminCourseThemes:'/admin/course-themes',
    adminTests:'/admin/tests',
    adminUsers:'/admin/users',
} as const;

export const headerNavRoutes:Record<string,navRoutesType> = {
    home:{
        title:'Головна',
        route:routes.home,
    },
    videoCourses:{
        title:'Відеокурси',
        route:routes.videoCourses,
    },
    tests:{
        title:'Тести',
        route:routes.tests,
    },
    aboutUs:{
        title:'Про нас',
        route:routes.aboutUs,
    }
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

export const adminNavRoutes:Record<string,navRoutesType> = {
    users:{
        title:'Users',
        route:routes.adminUsers
    },
    classes:{
        title:'Classes',
        route:routes.adminClasses,
    },
    courses:{
        title:'Courses',
        route:routes.adminCourses,
    },
    courseThemes:{
        title:'Course themes',
        route:routes.adminCourseThemes,
    },
    tests:{
        title:'Tests',
        route:routes.adminTests,
    },
}