import { getClassById } from '../../classes/get/getClassById';
import {  coursesCollection } from '../../collectionsKeys';
import { query,getDocs,where } from "firebase/firestore"
import { CourseT } from '../../../../types/course';

export const getCourses = async () => {
    const q = query(coursesCollection,where('isActive','==',true));
                  
    const docs = await getDocs(q);
    const courses = docs.docs.map(doc => doc.data());
    const classesQ = courses.map(async course => await getClassById(course.class));
    const classes = await Promise.all(classesQ);

    docs.docs.forEach((doc,i) => {
        courses[i].id = doc.id;
        courses[i].class = classes[i];
    });
    
    return courses as CourseT[];
}