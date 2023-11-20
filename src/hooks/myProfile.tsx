import { useEffect, useState } from "react";
import { useAppSelector } from "./redux"
import { getPurchasedItemsByUserId } from "@/firebase/db/purchasedItems/get/getPurchasedItemsByUserId";
import { PurchasedItemT } from "@/types/purchasedItem";
import { ChangeTeacherInfoFormT, } from "@/types/user";
import { changeUserTeacherInfo } from "@/firebase/db/users/edit/changeUserTeacherInfo";
import { storage } from "@/firebase/initializeFirebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { SubjectT } from "@/types/subject";

export const useMyProfile = () => {
    const user = useAppSelector(state => state.user);
    const [loading,setLoading] = useState<{items:boolean,changeInfo:boolean}>({items:false,changeInfo:false});
    const [purchasedItems,setPurchasedItems] = useState<PurchasedItemT[]>([]);
    const [isOnEditing,setIsOnEditing] = useState(false);
    const [chosenSubjects,setChosenSubjects] = useState<SubjectT[]>([]);

    const onChangeChosenSubjects = (stringified:string[]) => {
        setChosenSubjects(stringified.map(stri => JSON.parse(stri) as SubjectT))
    }
    const fetchPurchasedItems = async () => {
        if(!user.id) return;
        setLoading(prev => ({...prev,items:true}));
        const res = await getPurchasedItemsByUserId(user.id);
        if(!res) {
            setLoading(prev => ({...prev,items:false}));
            return;
        }
        setPurchasedItems(res);
        setLoading(prev => ({...prev,items:false}));
    }
    const onEditingToggle = () => {
        setIsOnEditing(prev => !prev);
    }    
    const uploadImage = async (file:File) => {
        const imageRef = ref(storage, `avatars/${file.name + v4()}`);
        const uploadQ = await uploadBytes(imageRef,file);
        return uploadQ;
    }
    const onChangeTeacherInfo = async (data:ChangeTeacherInfoFormT) => {
        console.log(data);
        setLoading(prev => ({...prev,changeInfo:true}));
        const loadedPhoto = await uploadImage(data.photo);
        const {photo,...dataWithoutPhoto} = data;
        //@ts-ignore
        await changeUserTeacherInfo({...user,teacherInfo:{...dataWithoutPhoto,subjects:chosenSubjects.map(subj => subj.id)},photoURL:loadedPhoto.metadata.fullPath});
        setLoading(prev => ({...prev,changeInfo:false}));
    }
    useEffect(() => {
        fetchPurchasedItems();
    }, [user.id])
    return {user,loading,purchasedItems,onEditingToggle,onChangeTeacherInfo,isOnEditing,onChangeChosenSubjects,chosenSubjects};
}