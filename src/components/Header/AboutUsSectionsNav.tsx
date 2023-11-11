import { useAboutUsSectionsNav } from "@/hooks/aboutUsSectionsNav";
import { Dropdown } from "antd";

export const AboutUsSectionsNav = () => {
    const {menuItems,loading} = useAboutUsSectionsNav();
    
    if(loading) return;
    return <>
        <Dropdown placement="bottom" menu={{items:menuItems}}><p className="text-white">Про нас</p></Dropdown>
    </>
}