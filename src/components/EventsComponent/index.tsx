import { EventT } from "@/types/event"
import { CarouselComponent } from "./Carousel";

type Props = {
    items:EventT[];
}

export const EventsComponent:React.FC<Props> = ({items}) => {

return <div className="flex flex-col gap-10 p-10">
        {items.map(item => 
            <div key={item.id} className="flex flex-col gap-5">
                <div className="flex w-full justify-between">
                    <p>{item.name}</p>
                    <p>{item.createdAt?.toDate()?.toLocaleString()}</p>
                </div>
                <p>{item.description}</p>
                <CarouselComponent photos={item.photos}/>
            </div>
        )}
    </div>
}