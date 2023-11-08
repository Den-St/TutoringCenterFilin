import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useState } from "react";
import { googleAuthProvider } from '../firebase/initializeFirebase';
import { clearAuthedUser } from '@/store/userSlice';

export const useLogout = (leave:() => void) => {
    const [logout,setLogout] = useState(false);
    const dispatch = useDispatch();
    const onLogout = async () => {
      await signOut(googleAuthProvider);
      setLogout(true);
      dispatch(clearAuthedUser());
      leave();
    }

    return {onLogout,logout};
}