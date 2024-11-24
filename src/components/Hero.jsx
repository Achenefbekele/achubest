"use client";
import Link from 'next/link';

const images = [
    '/image/landing/National_1.jpg',
    '/image/landing/National_2.jpg',
    '/image/landing/National_5.jpg',
    '/image/landing/Sidama_6.JPG',
    '/image/landing/tpic5.jpg',
    '/image/landing/tpic7.jpg',
    '/image/landing/National_1.jpg',
    '/image/landing/National_2.jpg',
    '/image/landing/National_5.jpg',
    '/image/landing/Sidama_6.JPG',
    '/image/landing/tpic5.jpg',
    '/image/landing/tpic7.jpg',
];

export default function Hero() {
    return (
        <div className="relative overflow-hidden w-screen h-screen">
            <div className="scroll-container">
                {images.concat(images).map((src, index) => (
                    <div
                        key={index}
                        className="scroll-item"
                        style={{
                            backgroundImage: `url(${src})`,
                        }}
                    />
                ))}
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-center p-8 md:p-16 text-white bg-black bg-opacity-40">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Improved Nutrition For a Better Future
                </h1>
                <p className="text-lg md:text-xl mb-10 max-w-lg">
                    FHI 360 with local implmenting partners in different regions across Ethiopia to improve nutrition behaviors and practices. Our objective is to empower individuals and families, creating pathways to a brighter, more resilient future.
                </p>
                <Link href="/about" className="bg-[#FF4719] text-white font-bold py-3 px-6 mt-4">
                    Learn More
                </Link>
            </div>
        </div>
    );
}
