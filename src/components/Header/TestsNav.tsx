'use client'
import { useTestsNav } from "@/hooks/testsNav";
import { useVideoCoursesNav } from "@/hooks/videoCoursesNav";
import { Dropdown } from "antd"

export const TestsNav = () => {
    const {menuItems,loading} = useTestsNav();
    
    return <>
        <Dropdown menu={{items:!loading ? menuItems : []}}><p className="text-white">Тести</p></Dropdown>
    </>
}