import Layout from "@/components/Layout";
import StoryCard from "@/components/ui/StoryCard";
import stories  from "@/data/stories";
export default function Stories() {
  return (
    <Layout>
      
      <main className='flex flex-col w-full min-h-[100vh] text-white bg-[#293745]'>
                <div className="flex flex-col p-20 gap-5 w-full justify-center border-b-2 border-[#FF4719] md:px-32 px-4">
                    <h1 className='text-3xl text-left md:text-5xl font-bold'>Stories</h1>
                    <p className="text-lg font-semibold">
                        Stories from the field
                    </p>
                </div>
              
                <div className="flex  items-center flex-wrap justify-center my-20">
                     {stories.map((story) => (
                        <StoryCard key={story.id} {...story} />
                    ))} 
                </div>

            </main>
   
    </Layout>
  );
}
