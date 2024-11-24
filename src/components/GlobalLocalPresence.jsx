"use client"
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
});

export default function GlobalLocalPresence() {
  return (
    <section className='bg-gray-100 p-10 flex flex-col gap-10 py-20'>
      <h1 className='text-5xl text-center font-bold'>Regions FHI 360 Works In </h1>
      <InteractiveMap />
    </section>
  );  
}
