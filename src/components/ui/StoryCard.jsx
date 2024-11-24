"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function StoryCard(data) {
    const router = useRouter();
    const handleStoryClick = (id) => {
        router.push(`/stories/${id}`);
    }
    return (
        <div className="w-[400px] h-[200px] rounded overflow-hidden shadow-lg m-4 bg-[#F4F4F4] relative group cursor-pointer" onClick={() => handleStoryClick(data.id)}>
            <Image 
                className="w-full transition-transform duration-300 transform group-hover:scale-110 group-hover:opacity-0" 
                src={data.image} 
                alt={data.title} 
                layout="responsive" 
                width={500} 
                height={500}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FF4719] opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-4">
                <p className="text-lg font-bold text-center text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                    </svg>
                    Feature Story
                </p>
                <h2 className="text-2xl font-bold text-center text-white">{data.title}</h2>
            </div>
        </div>
    )
}