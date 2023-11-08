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

export const AuthorizationNav:React.FC<{pathname:string}> = ({pathname}) => {
    const user = useAppSelector(state => state.user);
    const router = useRouter();
    const {onLogout,logout} = useLogout(() => router.push(routes.registration));
    
    console.log(user);
    return <nav aria-label="authorization label" className="flex gap-3">
        {!user?.id &&
           Object.keys(authorizationNavRoutes).map(navKey => 
                pathname === authorizationNavRoutes[navKey].route
                ? <Link className="underline" key={navKey} href={authorizationNavRoutes[navKey].route}>
                    {authorizationNavRoutes[navKey].title}
                </Link>
                : <Link key={navKey} href={authorizationNavRoutes[navKey].route}>
                    {authorizationNavRoutes[navKey].title}
                </Link>
            )}
        <div className="flex items-center gap-4 mr-5">
            <Link href={routes.myProfile}>{user?.displayName || (user?.name + ' ' + user?.surname)}</Link>
            <CartComponent/>
        </div>
        {!!user?.id && <Popconfirm
                        title="Logout from account"
                        description="Are you sure to logout from account?"
                        onConfirm={onLogout}
                        okText="Yes"
                        cancelText="No">
                        <button><LogoutOutlined /></button>
                    </Popconfirm>}
    </nav>
}

