import Image from 'next/image';
import certificates from '@/data/certificates';
export default function OurRecognitions() {


    return (
        <section className="p-8 text-center flex flex-col gap-5">
            <h1 className='text-5xl text-center font-bold'>Our Recognitions</h1>
            <p className="text-xl mb-8">
                Our contributions to community health and nutrition have been recognized by numerous health departments and organizations across Ethiopia.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {certificates.map((certificate, index) => (
                    <div key={index} className="relative overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
                        <Image 
                            src={certificate.src} 
                            alt={certificate.alt} 
                            layout="responsive" 
                            width={500} 
                            height={300} 
                            className="w-full h-auto"
                        />
                        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center py-2 text-sm">
                            {certificate.awardingBody} - {certificate.date}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
} 