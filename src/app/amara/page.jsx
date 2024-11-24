"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from "@/components/Layout";

export default function AmharaPage() {
    const [showMore, setShowMore] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        {
            id: 1,
            src: '/image/Amhara/National_1.jpg',
            title: '....',
            bio: `Bio to be added soon ....`
        },
        {
            id: 2,
            src: '/image/Amhara/National_3.jpg',
            title: 'pic...',
            bio: `Bio to be added soon.`
        },
        {
            id: 3,
            src: '/image/Amhara/National_4.jpg',
            title: 'pic...',
            bio: `Bio to be added soon.`
        },
        {
            id: 4,
            src: '/image/Amhara/National_4a.jpg',
            title: 'pic...',
            bio: `Bio to be added soon.`
        },
        {
            id: 5,
            src: '/image/Amhara/National_6.jpg',
            title: 'pic ...',
            bio: `Bio to be added soon.`
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [images.length]);

    const handleImageClick = (clickedImage) => {
        setSelectedImage(clickedImage);
        setCurrentImageIndex(images.findIndex(img => img.id === clickedImage.id));
    };

    const toggleReadMore = () => {
        setShowMore(!showMore);
    };

    return (
        <Layout>
            <main className="flex flex-col items-center min-h-screen">
                {/* Hero Section */}
                <div className="w-full bg-[#FF4719] text-white py-4 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-1">
                            Amhara Area Office
                        </h1>
                        <p className="text-lg">
                            Empowering communities and fostering sustainable development in Amhara
                        </p>
                    </div>
                </div>

                {/* Main content container */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-[#FF4719] mb-4">Amhara Region</h2>
                            <p className="text-lg">
                                The Feed the Future Ethiopia Community Nutrition Activity in Amhara 
                                region, led by FHI 360, is part of USAID comprehensive initiative 
                                to improve nutritional outcomes. The project focuses on strengthening 
                                nutrition services and increasing accessibility for women, children, 
                                and adolescent girls in the Amhara region.
                            </p>

                            {showMore && (
                                <p className="text-lg animate-fade-in">
                                    In Amhara, the project implements targeted interventions that 
                                    address the specific nutritional challenges of the region. The 
                                    initiative works closely with local communities and healthcare 
                                    providers to deliver sustainable nutrition solutions. Through 
                                    capacity building and community engagement, the project aims to 
                                    create lasting positive changes in nutritional practices.
                                    <br/><br/>
                                    The program emphasizes collaboration with local stakeholders and 
                                    integration with existing health systems to ensure long-term 
                                    sustainability. By focusing on evidence-based interventions and 
                                    community-led approaches, the project works to improve nutritional 
                                    outcomes across the Amhara region while respecting local customs 
                                    and practices.
                                </p>
                            )}

                            <button 
                                onClick={toggleReadMore}
                                className="bg-[#FF4719] text-white font-bold py-2 px-4 rounded hover:bg-[#ff5733] transition-colors"
                            >
                                {showMore ? 'Read Less' : 'Read More'}
                            </button>
                        </div>

                        {/* Right Column - update height */}
                        <div className="relative h-[300px] md:h-[400px]">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`absolute w-full h-full transition-opacity duration-500 cursor-pointer ${
                                        index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                                    onClick={() => handleImageClick(image)}
                                >
                                    <Image
                                        src={image.src}
                                        alt={`Dr. Achenef Kidane - ${image.id}`}
                                        fill
                                        className="object-cover rounded-lg"
                                        priority={index === 0}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                        <p className="text-center">Click to view bio {image.id}</p>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Navigation dots */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                {images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        className={`w-2 h-2 rounded-full ${
                                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            handleImageClick(image);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Modal for Bio */}
                    {selectedImage && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg max-w-3xl w-full relative">
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-shrink-0 w-full md:w-64">
                                            <div className="relative h-64 w-full">
                                                <Image
                                                    src={selectedImage.src}
                                                    alt={selectedImage.title}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold mb-2 text-[#FF4719]">{selectedImage.title}</h3>
                                            <div className="prose max-w-none">
                                                <p className="text-gray-700">{selectedImage.bio}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    );
}