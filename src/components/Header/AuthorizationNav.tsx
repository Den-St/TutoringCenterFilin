'use client'
import { authorizationNavRoutes, routes } from "@/consts/routes";
import { useLogout } from "@/hooks/logout";
import { useAppSelector } from "@/hooks/redux";
import {LogoutOutlined} from '@ant-design/icons';
import { Popconfirm } from "antd";
import Link from "next/link";
import {ShoppingCartOutlined} from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { CartComponent } from "./CartComponent";
import './styles.scss';

export const AuthorizationNav:React.FC<{pathname:string}> = ({pathname}) => {
    const user = useAppSelector(state => state.user);
    const router = useRouter();
    const {onLogout,logout} = useLogout(() => router.push(routes.registration));
    
    return <nav aria-label="authorization label" className="flex gap-3 items-center">
        {!user?.id &&
           Object.keys(authorizationNavRoutes).map(navKey => 
                pathname === authorizationNavRoutes[navKey].route
                ? <Link className="underline text-white" key={navKey} href={authorizationNavRoutes[navKey].route}>
                    {authorizationNavRoutes[navKey].title}
                </Link>
                : <Link key={navKey} className="text-white" href={authorizationNavRoutes[navKey].route}>
                    {authorizationNavRoutes[navKey].title}
                </Link>
            )}
        {user.id && <div className="flex items-center gap-4 mr-5">
            <Link className="text-white" href={routes.myProfile}>{user?.displayName || (user?.name + ' ' + user?.surname)}</Link>
            <CartComponent/>
        </div>}
        {!!user?.id && <Popconfirm
                        title="Logout from account"
                        description="Are you sure to logout from account?"
                        onConfirm={onLogout}
                        okText="Yes"
                        cancelText="No">
                        <button className="text-white bg-transparent"><LogoutOutlined /></button>
                    </Popconfirm>}
    </nav>
}

