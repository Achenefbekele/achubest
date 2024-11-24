"use client";
import { useEffect, useState } from 'react';
import events from '@/data/events';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { redirect } from 'next/navigation';
export default function EventPage({ params }) {
    const [id, setId] = useState(null);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        // Resolve the params promise and update the state
        (async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        })();
    }, [params]);

    useEffect(() => {
        if (id) {
            const foundEvent = events.find(event => event.id === Number(id));
            setEvent(foundEvent);
        }
    }, [id]);

    if (!id) {
        return <p>Loading...</p>;
    }

    if (!event) {
        return (
            <Layout>
                <main className='flex flex-col items-center w-full min-h-[100vh]'>
                    <div className='flex flex-col gap-7 justify-center w-full max-w-[600px] px-4 pt-10'>   
                        <h1 className='text-3xl md:text-5xl font-bold'>Event Not Found</h1>
                        <p className='text-base md:text-lg font-semibold'>The event you are looking for does not exist.</p>
                    </div>
                </main>
            </Layout>
        );
    }
    function handleRegister() {
        redirect(event.registration_link);
    }

    return (
        <Layout>
            <main className='flex flex-col items-center w-full min-h-[100vh] pb-32'>
                <div className='flex flex-col gap-7 justify-center max-w-[800px] px-4 py-10'>
                    <Image 
                        src={event.image} 
                        alt={event.title} 
                        width={600} 
                        height={300} 
                        className='w-full h-auto object-cover' 
                    />
                    <h2 className='text-lg md:text-xl font-semibold bg-[#FF4719] text-white w-fit px-4 py-1'>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
                    <h1 className='text-3xl md:text-5xl font-bold'>{event.title}</h1>
                    <hr className='border-b-2 border-[#293745] w-full' />
                    <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl md:text-3xl font-semibold'>Event Details</h2>
                    <p className='text-[#293745] flex items-center gap-2  text-lg md:text-lg font-semibold'>
                        <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd"/>
                        </svg>
                        {event.location}, {event.address}
                    </p>
                    <p className='text-[#293745] flex items-center gap-2 text-lg md:text-lg font-semibold'>
                        <svg className="w-6 h-6 text-gray-800 00" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        {(() => {
                            const [hours, minutes] = event.time.split(':').map(Number);
                            const date = new Date();
                            date.setHours(hours, minutes);
                            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                        })()}

                    </p>
                    </div>
                    <button className='bg-white border-2 border-[#293745] hover:bg-[#293745] hover:text-white hover:border-[#FF4719] text-lg md:text-xl  w-fit px-10 py-2 rounded-full' onClick={handleRegister}>Register</button>
                    <hr className='border-b-2 border-[#293745] w-full' />
                    <p className='text-base md:text-lg font-semibold'>{event.description}</p>
                </div>
            </main>
        </Layout>
    );
}