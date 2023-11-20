import { getStudyMaterialById } from '@/firebase/db/studyMaterials/get/getStudyMaterialById';
import { getCourseThemeById } from './../../courseThemes/get/getCourseThemeById';
import { CartItemT, CartItemTypeT } from '@/types/cartItem';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { cartItemsCollection } from '../../collectionsKeys';
import { CourseThemeT } from '@/types/courseThemes';
import { StudyMaterialT } from '@/types/studyMaterial';
import { getRealItemByProducIdFunctions } from '@/consts/getRealItemByProducIdFunctions';


export const getCartItemsByUserId = async (userId:string) => {
    try{
        const q = query(cartItemsCollection,where('user','==',userId));
        const docs = (await getDocs(q)).docs;
        const cartItems = docs.map(doc => doc.data());
        const productsQ = cartItems.map(async item => await getRealItemByProducIdFunctions[item.type as CartItemTypeT](item.product));
        const products = await Promise.all(productsQ);
        
        cartItems.forEach((item,i) => {
            item.id = docs[i].id;
            item.product = products[i];
        });
        
        console.log('ggg',cartItems);
        return cartItems as CartItemT[];
    }catch(err){
        console.error(err);
    }
} 