import { createUser } from "@/firebase/db/users/create/createUser";
import { googleAuthProvider, googleProvider } from "@/firebase/initializeFirebase";
import { RegistrationInterface } from "@/types/registration";
import { message } from "antd";
import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useRegistration = () => {
    // const disabled = true;
    const [success,setSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const showError = (message:string,key:string) => {
        messageApi.open({
          type: 'error',
          content: message,
          key
        });
    }
    const clearError = (key:string) => {
        messageApi.destroy(key);
    }

    const onSubmit:SubmitHandler<RegistrationInterface> = async (data:RegistrationInterface) => {
        // if(disabled) return;
        try{
            await createUserWithEmailAndPassword(googleAuthProvider,data.email,data.password);
            if(googleAuthProvider.currentUser === null) return;
            const {displayName, email, photoURL} = googleAuthProvider.currentUser;
            const {creationTime} = googleAuthProvider.currentUser.metadata;
            await createUser({
                              email,
                              displayName: displayName,
                              photoURL,
                              createdAt:new Date(),
                              name:data.name,
                              surname:data.surname,
                              patronymic:data.patronymic,
                              isTeacher:false,
                              teacherInfo:{
                                aboutMe:'',
                                contacts:[],
                                level:'',
                                photo:photoURL || '',
                                subjects:[]
                            }
                        });
            setSuccess(true);
        }catch(err){
            if(AuthErrorCodes.EMAIL_EXISTS === JSON.parse(JSON.stringify(err)).code){
              showError('Email already in use','auth');
            }
        }
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(googleAuthProvider,googleProvider);
            if(googleAuthProvider.currentUser === null) return;
            const {displayName, email, photoURL} = googleAuthProvider.currentUser;
            const {creationTime} = googleAuthProvider.currentUser.metadata;
            await createUser({
                            email,
                            displayName: displayName,
                            photoURL,
                            createdAt:new Date(),
                            name:'',
                            surname:'',
                            patronymic:'',
                            isTeacher:false,
                            teacherInfo:{
                                aboutMe:'',
                                contacts:[],
                                level:'',
                                photo:photoURL || '',
                                subjects:[]
                            }
                        });
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
    }

    return {signInWithGoogle,onSubmit,success,contextHolder,showError,clearError};
}