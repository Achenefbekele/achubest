'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from "@/components/Layout";

export default function Launching() {
    const [showMore, setShowMore] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        '/image/National_1.jpg',
        '/image/National_3.jpg',
        '/image/National_4.jpg',
        '/image/National_4a.jpg',
        '/image/National_6.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const handleDocumentOpen = (documentUrl) => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = documentUrl;
        link.setAttribute('download', ''); // This triggers download instead of open
        // Optional: Set content-disposition
        link.setAttribute('type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Create a reusable section component
    const ContentSection = () => (
        <div className="flex flex-col md:flex-row w-full p-8 md:p-16 gap-8">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-bold text-[#293745]">
                    Launching Ceremony for the National
                </h1>
                <div className="text-lg">
                    <p>
                        The launching ceremony for the Community Nutrition project in the
                        Tigray region of Ethiopia was a significant event...
                    </p>
                    {showMore && (
                        <>
                            <p className="mt-4">
                                He emphasized the project&apos;s role in breaking the
                                intergenerational cycle of malnutrition...
                            </p>
                            <p className="mt-4">
                                The event underscored the collaborative efforts...
                            </p>
                        </>
                    )}
                    <button 
                        onClick={() => setShowMore(!showMore)}
                        className="text-[#D03000] hover:text-[#FF4719] mt-4 font-semibold"
                    >
                        {showMore ? 'Show less' : 'Learn more'}
                    </button>
                </div>
            </div>

            {/* Right Column - Image Slider */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="relative h-[230px] md:h-[345px] w-[96%]">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                                currentSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <Image
                                src={src}
                                alt={`Event Image ${index + 1}`}
                                fill={true}
                                sizes="(max-width: 768px) 96vw, 48vw"
                                style={{ 
                                    objectFit: 'cover'
                                }}
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <Layout>
            <main className='flex flex-col w-full min-h-[100vh]'>
                <ContentSection />
                <ContentSection />
                <ContentSection />
            </main>
        </Layout>
    );
} 