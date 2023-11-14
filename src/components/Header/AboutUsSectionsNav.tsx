import { useAboutUsSectionsNav } from "@/hooks/aboutUsSectionsNav";
import { Dropdown } from "antd";

export const AboutUsSectionsNav = () => {
    const {menuItems,loading} = useAboutUsSectionsNav();
    
    return <>
        <Dropdown placement="bottom" menu={{items:!loading ? menuItems : []}}><p className="text-white">Про нас</p></Dropdown>
    </>
}