"use client";
import { useEffect, useState } from 'react';
import stories from "@/data/stories";   
import Layout from "@/components/Layout";
import Image from "next/image";

export default function StoryPage({ params }) {
    const [id, setId] = useState(null);
    const [story, setStory] = useState(null);

    useEffect(() => {
        // Resolve the params promise and update the state
        (async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
            console.log("id story", resolvedParams.id);
        })();
    }, [params]);

    useEffect(() => {
        if (id) {
            const foundStory = stories.find(story => story.id === Number(id));
            setStory(foundStory);
        }
    }, [id]);

    if (!id) {
        return <p>Loading...</p>;
    }

    if (!story) {
        return (
            <Layout>
                <main className='flex flex-col items-center w-full min-h-[100vh]'>
                    <div className='flex flex-col gap-7 justify-center w-full max-w-[600px] px-4 pt-10'>   
                        <h1 className='text-3xl md:text-5xl font-bold'>Story Not Found</h1>
                        <p className='text-base md:text-lg font-semibold'>The story you are looking for does not exist.</p>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className='flex flex-col items-center w-full min-h-[100vh] pb-32'>
                <div className='flex flex-col gap-7 justify-center w-full max-w-[800px] px-4 py-10'>
                <h2 className='text-lg md:text-xl font-semibold bg-[#FF4719] text-white w-fit px-4 py-1'>{new Date(story.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>

                    <h1 className='text-4xl md:text-6xl font-bold'>{story.title}</h1>
                    <p className='text-base md:text-lg font-semibold'>{story.description}</p>
                    <Image src={story.image} alt={story.title} width={600} height={300} className='w-full h-auto' />
                    <p className='text-base md:text-lg font-medium'>{story.details}</p>
                </div>
            </main>
        </Layout>
    );
}