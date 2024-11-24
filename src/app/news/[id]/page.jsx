"use client";
import { useEffect, useState } from 'react';
import articles from '@/data/articles';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function NewsPage({ params }) {
    const [id, setId] = useState(null);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        // Resolve the params promise and update the state
        (async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
            console.log("id event",resolvedParams.id);
        })();
    }, [params]);

    useEffect(() => {
        if (id) {
            const foundArticle = articles.find(article => article.id === Number(id));
            setArticle(foundArticle);
        }
    }, [id]);

    if (!id) {
        return <p>Loading...</p>;
    }

    if (!article) {
        return (
            <Layout>
                 <main className='flex flex-col items-center w-full min-h-[100vh]'>
                    <div className='flex flex-col gap-7 justify-center w-full max-w-[600px] px-4 pt-10'>   
                        <h1 className='text-3xl md:text-5xl font-bold'>Article Not Found</h1>
                        <p className='text-base md:text-lg font-semibold'>The article you are looking for does not exist.</p>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className='flex flex-col items-center w-full min-h-[100vh] pb-32'>
                <div className='flex flex-col gap-7 justify-center w-full max-w-[800px] px-4 py-10'>
                    <h2 className='text-lg md:text-xl font-semibold bg-[#FF4719] text-white w-fit px-4 py-1'>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
                    <h1 className='text-3xl md:text-5xl font-bold'>{article.title}</h1>
                    <p className='text-base md:text-lg font-semibold'>{article.description}</p>
                    <Image src={article.image} alt={article.title} width={600} height={300} className='w-full h-auto' />
                    <p className='text-base md:text-lg font-medium'>{article.detail}</p>
                </div>
            </main>
        </Layout>
    );
}
