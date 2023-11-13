import { SearchStudyMaterialsT } from './../../../../hooks/getPaginatedStudyMaterials';
import { getClassById } from '../../classes/get/getClassById';
import { collectionsKeys, coursesCollection, studyMaterialsCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { CourseT } from '../../../../types/course';
import { db } from '../../../initializeFirebase';
import { StudyMaterialT } from '../../../../types/studyMaterial';

export const getStudyMaterialsPaginated = async (paginationData:PaginationType,searchData:SearchStudyMaterialsT) => {
    console.log(paginationData)
    console.log('searchData',searchData);
    const q = searchData.name ? 
                    query(studyMaterialsCollection,orderBy('name','desc'),
                        where('name',">=",(searchData.name.trim().toLowerCase() || '')),   
                        where('name','<=',(searchData.name.trim().toLowerCase() || '') + "\uf8ff"),
                        // startAt(paginationData.page - 1 * paginationData.pageSize),
                        // limit(paginationData.pageSize),
                    )
                    : searchData.themes ? query(studyMaterialsCollection,orderBy('themes','desc'),
                        where('themes',">=", (searchData.themes.trim().toLowerCase() || '')),   
                        where('themes','<=',(searchData.themes.trim().toLowerCase() || '') + "\uf8ff"),
                        // startAt(paginationData.page - 1 * paginationData.pageSize),
                        // limit(paginationData.pageSize),
                    ) : query(studyMaterialsCollection,orderBy('createdAt','desc'),
                        // startAt(paginationData.page - 1 * paginationData.pageSize),
                        // limit(paginationData.pageSize),
                        );


    const coll = collection(db, collectionsKeys.courses);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const filteredDocs:any[] = [];
    console.log(docs.docs?.[0]?.data())
    let items:any[] = [];
    if(searchData.name?.trim()?.toLowerCase() && searchData.themes?.trim()?.toLowerCase()){
        items = docs.docs.map(doc => {
        if((doc.data().themes as string).includes(searchData.themes) && doc.data().forTeacher === searchData.forTeacher) {
            filteredDocs.push(doc);
            return doc.data();
        }}).filter(data => data);
    }else{
        items = docs.docs.map(doc => {
        if(doc.data().forTeacher === searchData.forTeacher) {
            filteredDocs.push(doc);
            return doc.data();
        }}).filter(data => data);
    }

    console.log('items',items);
    console.log('items2',filteredDocs);
    // const items = docs.docs.map(doc => doc.data());
    const classesQ = items.map(async item => await getClassById(item.class));
    const classes = await Promise.all(classesQ);

    filteredDocs.forEach((doc,i) => {
        items[i].id = doc.id;
        items[i].class = classes[i];
    });
    
    return {items:items as StudyMaterialT[],count:countSnapshot.data().count};
}