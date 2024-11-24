"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function NewsCard(data) {
    const router = useRouter();

    const handleArticleClick = (id) => {
        router.push(`/news/${id}`);
      };
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-[#F4F4F4] cursor-pointer" onClick={() => handleArticleClick(data.id)}>
           
            <div className="overflow-hidden">
                <Image className="w-full transform transition-transform duration-300 hover:scale-105" src={data.image} alt={data.title} layout="responsive" />
            </div>
            <div className="px-6 py-4">
                <h2 className="text-lg font-semibold hover:underline hover:text-[#D03000] cursor-pointer">
                    {data.title}
                </h2>
                <p className="text-gray-700 text-base mt-2">{data.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-gray-600 text-sm">{data.readTime} min read</span>
            </div>
        </div>
    );
}

export default NewsCard;
