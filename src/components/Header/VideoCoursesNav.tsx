'use client'
import { useVideoCoursesNav } from "@/hooks/videoCoursesNav";
import { Dropdown } from "antd"

export const VideoCoursesNav = () => {
    const {menuItems,loading} = useVideoCoursesNav();
    
    return <>
        <Dropdown menu={{items:!loading ? menuItems : []}}><p className="text-white">Відеокурси</p></Dropdown>
    </>
}