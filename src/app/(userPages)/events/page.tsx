import { EventsComponent } from "@/components/EventsComponent";
import { getEvents } from "@/firebase/db/events/get/getEvents";

export default async function Events() {
    const events = await getEvents();

    return <EventsComponent items={events}/>
}