import type { MenuProps } from 'antd';
import { CourseT } from '../types/course';
import { useEffect } from 'react';
import { getVideoCoursesNav } from '@/firebase/db/videoLessons/get/getVideoCoursesNav';
import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/consts/routes';
export const useVideoCoursesNav = () => {
    const [loading,setLoading] = useState(false);
    const [menuItems,setMenuItems] = useState<MenuProps['items']>([]);

    const fetch = async () => {   
        setLoading(true);
        const res = await getVideoCoursesNav();
        // setVideoCourses(res);
        setMenuItems(Object.keys(res).map(key => ({
            key,
            type:'group',
            label:key + ' клас',
            children: res[+key].map(videoCourse => ({
                key:key + videoCourse.id,
                label:<Link href={routes.videoCourses(videoCourse.id)}>{videoCourse.shortName}</Link>
            }))
        })))

        setLoading(false);
    }
    useEffect(() => {
        fetch();
    },[])

    return {menuItems,loading};
}