import { VideoLessonT } from './../../../../types/videoLesson';
import { where, getDocs,query,orderBy } from 'firebase/firestore';
import { videoLessonsCollection } from '../../collectionsKeys';

export const getVideoLessonsByCourseThemeId = async (courseThemeId:string) => {
    try{
        const q = query(videoLessonsCollection,
            where('courseTheme','==',courseThemeId),orderBy('number','asc')
            );
        const docs = (await getDocs(q)).docs;
        const videos = docs.map(doc => doc.data());
        videos.forEach((video,i) => {
            video.id = docs[i].id;
        });

        return videos as VideoLessonT[];
    }catch(err){
        console.error(err);
    }
}