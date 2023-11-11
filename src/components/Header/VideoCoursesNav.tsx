'use client'
import { useVideoCoursesNav } from "@/hooks/videoCoursesNav";
import { Dropdown } from "antd"

export const VideoCoursesNav = () => {
    const {menuItems,loading} = useVideoCoursesNav();
    
    if(loading) return;
    return <>
        <Dropdown menu={{items:menuItems}}><p className="text-white">Відеокурси</p></Dropdown>
    </>
}