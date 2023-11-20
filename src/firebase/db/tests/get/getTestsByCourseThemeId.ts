import { TestProductT } from './../../../../types/testProduct';
import { testsCollection } from './../../collectionsKeys';
import { VideoLessonT } from './../../../../types/videoLesson';
import { where, getDocs,query,orderBy } from 'firebase/firestore';
import { videoLessonsCollection } from '../../collectionsKeys';

export const getTestsByCourseId = async (courseId:string) => {
    try{
        const q = query(testsCollection,
            where('course','==',courseId),
            where('price','!=',0)
        );
        const docs = (await getDocs(q)).docs;
        const tests = docs.map(doc => doc.data());
        tests.forEach((test,i) => {
            test.id = docs[i].id;
        });

        return tests as TestProductT[];
    }catch(err){
        console.error(err);
    }
}