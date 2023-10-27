import { LoginInterface } from './../types/login';
import { message } from "antd";
import { signInWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { googleAuthProvider, googleProvider } from "../firebase/initializeFirebase";
import { RegistrationInterface } from "../types/registration";

export const useLogin = () => {
    const [success,setSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const showError = (message:string,key:string) => {
      messageApi.open({
        type: 'error',
        content: message,
        key,
        duration:20
      });
    }
    const clearError = (key:string) => {
      messageApi.destroy(key);
    }
    const onSubmit:SubmitHandler<LoginInterface> = async (data:LoginInterface) => {
        try{
            await signInWithEmailAndPassword(googleAuthProvider,data.email,data.password);
            setSuccess(true);
        }catch(err){
            if(AuthErrorCodes.INVALID_PASSWORD === JSON.parse(JSON.stringify(err)).code 
                || AuthErrorCodes.INVALID_EMAIL === JSON.parse(JSON.stringify(err)).code 
                 ){
                  clearError('email');
                  clearError('password');
                  showError('Incorrect email or password',"auth");
            }
        }
      }
      const signInWithGoogle = async () => {
        try{
            await signInWithPopup(googleAuthProvider,googleProvider);
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
      }    

    return {success,contextHolder,onSubmit,signInWithGoogle,showError,clearError};
}