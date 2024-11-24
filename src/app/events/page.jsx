import Layout from "@/components/Layout";
import events from "@/data/events";
import EventsCard from "@/components/ui/EventsCard";

export default function Events() {
    const currentDate = new Date();
    const sortedEvents = events.sort((a, b) => Math.abs(new Date(b.date) - currentDate) - Math.abs(new Date(a.date) - currentDate));
    return (
        <Layout>
            <main className='flex flex-col w-full min-h-[100vh] '>
                <div className="flex flex-col md:p-20 p-10 gap-5 w-full justify-center text-white bg-[#FF4719]">
                    <h1 className='text-3xl text-left md:text-5xl font-bold'>Events</h1>
                </div>
              
                <div className="flex flex-col items-center flex-wrap justify-center my-20">
                    {sortedEvents.map((event) => (
                        <EventsCard key={event.id} {...event} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}
