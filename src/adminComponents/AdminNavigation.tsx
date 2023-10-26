import { Menu  } from "antd"
import type { MenuProps } from 'antd';
import Link from "next/link";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { adminNavRoutes } from "@/consts/routes";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }


export const AdminNavigation = () => {
    const menuItems:MenuProps['items'] = Object.keys(adminNavRoutes).map(key => 
        getItem(<Link href={adminNavRoutes[key].route}>{adminNavRoutes[key].title}</Link>,key));

    return <Menu 
            style={{width:'200px'}}
            items={menuItems} 
            mode="inline"/>
}