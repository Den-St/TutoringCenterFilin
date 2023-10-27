'use client'
import { useAuth } from "@/hooks/auth.hook";
import { Spin } from "antd";
import React from "react"

type Props = {
    children:React.ReactNode
}

export const AuthProvider:React.FC<Props> = ({children}) => {
   const {loading, isSignedIn} = useAuth();
//    const path = useLocation().pathname;
   
    // if(loading) return <Display style={{width:'100%',height:'90vh',justifyContent:"center",alignItems:'center'}}><Spin/></Display>
    // if(!loading && !isSignedIn && path !== '/registration' && path !== '/login') {
    //     return <Navigate to={'/registration'}/>
    // }
    return <>
        {children}
    </>
}
