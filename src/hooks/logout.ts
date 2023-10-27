import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useState } from "react";
import { googleAuthProvider } from '../firebase/initializeFirebase';
import { clearAuthedUser } from '@/store/userSlice';

export const useLogout = () => {
    const [logout,setLogout] = useState(false);
    const dispatch = useDispatch();
    const onLogout = async () => {
      await signOut(googleAuthProvider);
      setLogout(true);
      dispatch(clearAuthedUser());
    }

    return {onLogout,logout};
}