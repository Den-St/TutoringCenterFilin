'use client'

import { routes } from "@/consts/routes";
import { useConfirmPayment } from "@/hooks/confirmPayment";
import Link from "next/link";

export default function AfterPayment() {
    useConfirmPayment();

    return <div className="w-full h-100 flex flex-col items-center justify-center gap-5">
        <h1>Замовлення успішно оплачено</h1>
        <Link href={routes.myProfile}>До куплених матеріалів</Link>
    </div>
}