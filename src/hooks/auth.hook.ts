import { UserT } from './../types/user';
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { googleAuthProvider } from "../firebase/initializeFirebase";
import { setUser } from "../store/userSlice";
import { useAppDispacth } from "./redux";
import { getUserByEmail } from '../firebase/db/users/get/getUserByEmail';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isSignedIn,setIsSignedIn] = useState(true);
    const dispatch = useAppDispacth();
    
    useEffect(() => {
        onAuthStateChanged(googleAuthProvider,async () => {
            setIsSignedIn(true);
            if(!googleAuthProvider.currentUser) {
                setLoading(false);
                setIsSignedIn(false);
                return;
            }

            const user = await getUserByEmail(googleAuthProvider.currentUser?.email);

            const userDataGoogle:UserT = {
                email:googleAuthProvider.currentUser?.email,
                displayName:googleAuthProvider.currentUser?.displayName,
                createdAt:googleAuthProvider.currentUser?.metadata.creationTime,
                photoURL:googleAuthProvider.currentUser?.photoURL,
            }
            dispatch(setUser({
                ...userDataGoogle,...user
            }));
        });
        setLoading(false);
    },[]);

    return {loading, isSignedIn, setIsSignedIn};
}