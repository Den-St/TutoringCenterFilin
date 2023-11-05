import type { MenuProps } from 'antd';
import { CourseT } from '../types/course';
import { useEffect } from 'react';
import { getVideoCoursesNav } from '@/firebase/db/videoLessons/get/getVideoCoursesNav';
import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/consts/routes';
import { getAllAboutUsSections } from '@/firebase/db/aboutUsSections/get/getAllAboutUsSections';

export const useAboutUsSectionsNav = () => {
    const [loading,setLoading] = useState(false);
    const [menuItems,setMenuItems] = useState<MenuProps['items']>([]);

    const fetch = async () => {   
        setLoading(true);
        const res = await getAllAboutUsSections();
        setMenuItems(res.map(section => ({
            key:section.id,
            label:<Link href={routes.aboutUs(section.id)}>{section.name}</Link>,
        })))

        setLoading(false);
    }
    useEffect(() => {
        fetch();
    },[])

    return {menuItems,loading};
}