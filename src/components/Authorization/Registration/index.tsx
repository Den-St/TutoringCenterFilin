'use client'
import { useRegistration } from "@/hooks/registration";
import { RegistrationInterface } from "@/types/registration";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";


export const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegistrationInterface>();
    const {onSubmit,showError,signInWithGoogle,success,contextHolder} = useRegistration();
    if(success) redirect('/');

    return <main className="flex flex-col items-center gap-2 my-2">
        {contextHolder}
        <form className="flex flex-col items-center p-5 border-2 border-black border-solid gap-2" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="email" type="email" className="border-2 border-black border-solid"/>
            <input {...register('name')} placeholder="name" className="border-2 border-black border-solid"/>
            <input {...register('surname')} placeholder="second name" className="border-2 border-black border-solid"/>
            <input {...register('password',{minLength:6})} type={'password'} placeholder="password" className="border-2 border-black border-solid"/>
            <input className={'bg-slate-300 p-2 cursor-pointer'} type={'submit'} value="SUBMIT"/>
        </form>
        <button className={'bg-slate-300 p-2'} onClick={signInWithGoogle}>GOOGLE</button>
    </main>
}