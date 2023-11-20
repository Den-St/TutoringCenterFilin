import { CourseT } from './../types/course';
import { ClassT } from '../types/class';
import { useCallback, useState } from 'react';
import { getClassesByNumber } from '../firebase/db/classes/get/getClassesByNumber';
import _debounce from 'lodash/debounce';
import { getCoursesBySecondName } from '../firebase/db/courses/get/getCoursesBySecondName';

export const useSearchCourse = () => {
    const [coursesItems,setCoursesItems] = useState<CourseT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchClass = async (value?:string) => {
        if(!value){
            setCoursesItems([]);
            return;
        }
        setLoading(true);

        const res = await getCoursesBySecondName(value);
        setLoading(false);
        if(!res) return;
        setCoursesItems(res);
    }

    const debounceSearchClass = useCallback(_debounce(searchClass, 400), []);

    return {debounceSearchClass,classSearchLoading:loading,coursesItems,};
}