import Image from 'next/image';

export default function Partners() {
    const logos = [
        '/logo/rti.svg',
        '/logo/Henzconsulting-2.svg',
        
        '/logo/zeleman.svg',
        '/logo/rti.svg',
        '/logo/Henzconsulting-2.svg',
        
        '/logo/zeleman.svg',
    ];

    return (
        <section className="flex flex-col gap-6 bg-[#F9F9F9] py-10 px-4 sm:px-8 md:px-20">
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold">
                Our Consortium Members
            </h1>
            <div className="relative overflow-hidden w-full h-auto">
                <div className="scroll-container-partner flex gap-6 sm:gap-10 md:gap-20 w-auto">
                    {logos.concat(logos).map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            width={80}
                            height={32}
                            alt={`Logo ${index + 1}`}
                            className="flex-shrink-0"
                        />
                    ))}
                </div>
                {/* Gradient overlays for fading effect */}
                <div className="absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-[#F9F9F9] to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-[#F9F9F9] to-transparent pointer-events-none"></div>
            </div>
        </section>
    );
}
