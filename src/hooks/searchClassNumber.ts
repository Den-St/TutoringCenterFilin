import { useEffect } from 'react';
import { getClasses } from './../firebase/db/classes/get/getClasses';
import { ClassT } from './../types/class';
import { useCallback, useState } from 'react';
import { getClassesByNumber } from '../firebase/db/classes/get/getClassesByNumber';
import _debounce from 'lodash.debounce';

export const useSearchClass = () => {
    const [classesItems,setClassesItems] = useState<ClassT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchClass = async (value?:string) => {
        setLoading(true);
        const res = await getClasses();
        setLoading(false);
        if(!res) return;
        setClassesItems(res);
    }

    useEffect(() => {
        searchClass()
    },[]);
    
    return {classSearchLoading:loading,classesItems,};
}