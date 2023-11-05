import { collection } from 'firebase/firestore';
import { db } from '../initializeFirebase';
export enum collectionsKeys {
    users = "users",
    classes = "classes",
    courses = "courses",
    courseThemes = "courseThemes",
    videoLessons = "videoLessons",
    tests = "tests"
};

export const classesCollection = collection(db,collectionsKeys.classes);
export const coursesCollection = collection(db,collectionsKeys.courses);
export const courseThemesCollection = collection(db,collectionsKeys.courseThemes);
export const videoLessonsCollection = collection(db,collectionsKeys.videoLessons);
export const testsCollection = collection(db,collectionsKeys.tests);