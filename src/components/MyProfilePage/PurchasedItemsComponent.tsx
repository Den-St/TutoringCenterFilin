import { routes } from "@/consts/routes"
import { PurchasedItemsT } from "@/types/purchasedItem"
import Link from "next/link"

type Props = {
    items:PurchasedItemsT[]
}

export const PurchasedItemsComponent:React.FC<Props> = ({items}) => {
    return <div className="flex flex-col gap-4">
        {items.map(item => 
            <div key={item.id} className="flex justify-between border-grey border-2 border-solid p-4">
                {item.product.name}
                <Link href={routes.purchasedItem(item.id)}>Перейти</Link>
            </div>)}
    </div>
}