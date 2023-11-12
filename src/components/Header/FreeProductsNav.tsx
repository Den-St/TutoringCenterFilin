import { routes } from "@/consts/routes";
import { useVideoCoursesNav } from "@/hooks/videoCoursesNav";
import { Dropdown, MenuProps } from "antd"
import Link from "next/link";

export const FreeProductsNav = () => {
    const items: MenuProps['items'] = [
        {
          label: (
            <Link href={routes.freeVideoCourses}>
               Відеокурси
            </Link>
          ),
          key: '0',
        },
      ];
    return <>
        <Dropdown menu={{items}}><p className="text-white">Подарунки</p></Dropdown>
    </>
}