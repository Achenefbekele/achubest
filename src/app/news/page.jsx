"use client"
import Layout from "@/components/Layout";
import articles from '@/data/articles';
import NewsCard from '@/components/ui/NewsCard';

export default function News() {
  // Sort articles by date in descending order
  const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Layout>
      <div className='mb-10 bg-[#293745] py-20 md:px-32 px-4 flex flex-col justify-center gap-4'>
        <h1 className=' text-white text-3xl sm:text-4xl md:text-5xl font-bold '>News</h1>
        <p className='text-white w-[600px] text-lg'>FHI 360 is a global organization that mobilizes research, resources and relationships so that people everywhere can access the opportunities they need to lead full, healthy lives. Our staff of over 4,000 experts work in more than 60 countries around the world.</p>
      </div>
      <main className='flex flex-wrap gap-4 justify-center pb-20'>
        {sortedArticles.map((article) => (
            <NewsCard key={article.id} {...article} />
        ))}
      </main>
    </Layout>
  );
}
