'use client'
import { PurchasedItemComponent } from "@/components/PurchasedItem"


function PurchasedItemPage({ params }: { params: { slug: string } }) {
  console.log('params',params);
  
  return <PurchasedItemComponent/>
}
  
  export default PurchasedItemPage