import { collection } from 'firebase/firestore';
import { db } from '../initializeFirebase';
export enum collectionsKeys {
    users = "users",
    classes = "classes",
    courses = "courses",
    courseThemes = "courseThemes",
    videoLessons = "videoLessons",
    tests = "tests",
    aboutUsSections = "aboutUsSections",
    cartItems = "cartItems",
    purchasedItems = "purchasedItems",
    events = 'events',
    studyMaterials = "studyMaterials",
    subjects = "subjects",
    teacherReviews = "teacherReviews",
    orders = "orders",
    lessons = "lessons",
};

export const classesCollection = collection(db,collectionsKeys.classes);
export const coursesCollection = collection(db,collectionsKeys.courses);
export const courseThemesCollection = collection(db,collectionsKeys.courseThemes);
export const videoLessonsCollection = collection(db,collectionsKeys.videoLessons);
export const testsCollection = collection(db,collectionsKeys.tests);
export const aboutUsSectionCollection = collection(db,collectionsKeys.aboutUsSections);
export const cartItemsCollection = collection(db,collectionsKeys.cartItems);
export const purchasedItemsCollection = collection(db,collectionsKeys.purchasedItems);
export const eventsCollection = collection(db,collectionsKeys.events);
export const studyMaterialsCollection = collection(db,collectionsKeys.studyMaterials);
export const subjectsCollection = collection(db,collectionsKeys.subjects);
export const teacherReviewsCollection = collection(db,collectionsKeys.teacherReviews);
export const ordersCollection = collection(db,collectionsKeys.orders);
export const lessonsCollection = collection(db,collectionsKeys.lessons);
