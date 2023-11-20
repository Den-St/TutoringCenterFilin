import { navRoutesType } from "@/types/routes";

export const routes = {
    home:'/',
    videoCourseThemesByCourseId:(id:string) => `/video-course-themes/${id}`,
    // tests:'/tests',
    aboutUs:(id:string) => `/about-us/${id}`,
    registration:'/registration',
    logIn:'/log-in',
    cart:'/cart',
    purchasedItem:(id:string) => `/purchased-items?id=${id}`,
    myProfile:'/my-profile',
    events:'/events',
    freeVideoCourses:`/free-video-courses`,
    freeStudyMaterials:`/free-study-materials`,
    freeStudyMaterialsItemPage:(id:string) => `/free-study-materials/${id}`,
    freeVideoCourseItem:(id:string) => `/free-video-courses/${id}`,
    studyMaterials:'/study-materials',
    tests:(id:string) => `/tests/${id}`,
    freeTests:'/free-tests',
    freeTestItem:(id:string) => `/free-tests/${id}`,
    teachers:`/teachers`,
    teacher:(id:string) => `/teachers/${id}`,
    afterPayment:(id:string) => `/after-payment?order_id=${id}`
} as const;

export const headerNavRoutes:Record<string,navRoutesType> = {
    home:{
        title:'Головна',
        route:routes.home,
    },
    events:{
        title:'Події',
        route:routes.events,
    },
    studyMaterials:{
        title:'Посібники',
        route:routes.studyMaterials,
    },
    teachers:{
        title:'Наші вчителі',
        route:routes.teachers,
    },
    // videoCourses:{
    //     title:'Відеокурси',
    //     route:routes.videoCourses,
    // },
    // tests:{
    //     title:'Тести',
    //     route:routes.tests,
    // },
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