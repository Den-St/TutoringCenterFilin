import { CourseT } from '../../../../types/course';
import { getDocs, query, where } from 'firebase/firestore';
import { classesCollection, videoLessonsCollection, coursesCollection } from '../../collectionsKeys';
import { VideoLessonT } from '@/types/videoLesson';

export const getTestsNav = async () => {
    const videoLessonsQ = query(coursesCollection,where('isActive',"==",true),);
    const classesQ = query(classesCollection,where('isActive',"==",true),);
    const [videoLessonsDocs,classesDocs] = await Promise.all([(await getDocs(videoLessonsQ)).docs,(await (getDocs(classesQ))).docs]);
    const videoLessons = videoLessonsDocs.map(doc => doc.data());
    const classes = classesDocs.map(doc => doc.data());

    videoLessonsDocs.forEach((doc,i) => {
        videoLessons[i].id = doc.id;
    });
    classesDocs.forEach((doc,i) => {
        classes[i].id = doc.id;
    });
    //@ts-ignore
    const videoLessonsGroupedByClassId:Record<number,CourseT[]> = Object.groupBy(videoLessons,(videoLessonItem) => classes.find(classItem => classItem.id === videoLessonItem.class).number);
    
    return videoLessonsGroupedByClassId;
}