"use client";
import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import Image from 'next/image';

export default function OromiaPage() {
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const [showMore3, setShowMore3] = useState(false);
    const [showMore4, setShowMore4] = useState(false);
    const [showMore5, setShowMore5] = useState(false);
    const [showMore6, setShowMore6] = useState(false);
    const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
    const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
    const [currentImageIndex3, setCurrentImageIndex3] = useState(0);
    const [currentImageIndex4, setCurrentImageIndex4] = useState(0);
    const [currentImageIndex5, setCurrentImageIndex5] = useState(0);
    const [currentImageIndex6, setCurrentImageIndex6] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        {
            id: 1,
            src: '/image/oromia/Arsi_zone/Arsi_1.jpg',
            title: 'Oromia Team Member 1',
            bio: 'Bio description for team member 1...'
        },
        {
            id: 2,
            src: '/image/oromia/East_Harerge/East Harerge.jpg',
            title: 'Oromia Team Member 2',
            bio: 'Bio description for team member 2...'
        },
        {
            id: 3,
            src: '/image/oromia/East_shoa/east_shoa.jpg',
            title: 'Oromia Team Member 3',
            bio: 'Bio description for team member 3...'
        },
        {
            id: 4,
            src: '/image/oromia/Jimma/jimma1.jpg',
            title: 'Oromia Team Member 4',
            bio: 'Bio description for team member 4...'
        },
        {
            id: 5,
            src: '/image/oromia/west_arsi/west_arsi.jpg',
            title: 'Oromia Team Member 5',
            bio: 'Bio description for team member 5...'
        }
    ];

    const imagesArrays = [
        images,
        images.map(img => ({...img, id: img.id + 5})),
        images.map(img => ({...img, id: img.id + 10})),
        images.map(img => ({...img, id: img.id + 15})),
        images.map(img => ({...img, id: img.id + 20})),
        images.map(img => ({...img, id: img.id + 25}))
    ];

    const sectionTitles = [
        "Arisi Zone",
        "Bale Zone",
        "Jimma Zone",
        "West Arsi Zone",
        "East Hararge Zone",
        "East Shewa Zone"
    ];

    useEffect(() => {
        const timers = imagesArrays.map((_, index) => {
            return setInterval(() => {
                const setCurrentIndex = [
                    setCurrentImageIndex1,
                    setCurrentImageIndex2,
                    setCurrentImageIndex3,
                    setCurrentImageIndex4,
                    setCurrentImageIndex5,
                    setCurrentImageIndex6
                ][index];
                
                setCurrentIndex(prevIndex => 
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);
        });

        return () => timers.forEach(timer => clearInterval(timer));
    }, []);

    const handleImageClick = (clickedImage) => {
        setSelectedImage(clickedImage);
        const index = images.findIndex(img => img.id === clickedImage.id % 5 || img.id === 5);
        const setters = [
            setCurrentImageIndex1, 
            setCurrentImageIndex2, 
            setCurrentImageIndex3, 
            setCurrentImageIndex4, 
            setCurrentImageIndex5,
            setCurrentImageIndex6
        ];
        setters.forEach(setter => setter(index));
    };

    const toggleReadMore = (sectionIndex) => {
        const setters = [setShowMore1, setShowMore2, setShowMore3, setShowMore4, setShowMore5, setShowMore6];
        const states = [showMore1, showMore2, showMore3, showMore4, showMore5, showMore6];
        setters[sectionIndex](!states[sectionIndex]);
    };

    return (
        <Layout>
            <main className="flex flex-col items-center min-h-screen">
                {/* Hero Section - minimal padding */}
                <div className="w-full bg-[#FF4719] text-white py-4 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-1">
                            Oromia Area Office
                        </h1>
                        <p className="text-lg">
                            Empowering communities and fostering sustainable development in Oromia
                        </p>
                    </div>
                </div>

                {[0, 1, 2, 3, 4, 5].map((sectionIndex) => (
                    <div key={sectionIndex} className="container mx-auto px-4 py-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-[#FF4719] mb-6">
                                    {sectionTitles[sectionIndex]}
                                </h2>
                                
                                <p className="text-lg">
                                    The Feed the Future Ethiopia Community Nutrition Activity in Oromia 
                                    region, led by FHI 360, is part of USAID comprehensive initiative 
                                    to improve nutritional outcomes. The project focuses on strengthening 
                                    nutrition services and increasing accessibility for women, children, 
                                    and adolescent girls in the Oromia region.
                                </p>

                                {[showMore1, showMore2, showMore3, showMore4, showMore5, showMore6][sectionIndex] && (
                                    <p className="text-lg animate-fade-in">
                                        In Oromia, the project implements targeted interventions that 
                                        address the specific nutritional challenges of the region. The 
                                        initiative works closely with local communities and healthcare 
                                        providers to deliver sustainable nutrition solutions.
                                    </p>
                                )}

                                <button 
                                    onClick={() => toggleReadMore(sectionIndex)}
                                    className="bg-[#FF4719] text-white font-bold py-2 px-4 rounded hover:bg-[#ff5733] transition-colors"
                                >
                                    {[showMore1, showMore2, showMore3, showMore4, showMore5, showMore6][sectionIndex] ? 'Read Less' : 'Read More'}
                                </button>
                            </div>

                            {/* Right Column */}
                            <div className="relative h-[300px] md:h-[400px]">
                                {imagesArrays[sectionIndex].map((image, index) => (
                                    <div
                                        key={image.id}
                                        className={`absolute w-full h-full transition-opacity duration-500 cursor-pointer ${
                                            index === [currentImageIndex1, currentImageIndex2, currentImageIndex3, 
                                                     currentImageIndex4, currentImageIndex5, currentImageIndex6][sectionIndex] 
                                                ? 'opacity-100 z-10' 
                                                : 'opacity-0 z-0'
                                        }`}
                                        onClick={() => handleImageClick(image)}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={`${image.title} - ${image.id}`}
                                            fill
                                            className="object-contain rounded-lg"
                                            priority={true}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                            <p className="text-center">Click to view bio {image.id}</p>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Navigation dots */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                    {imagesArrays[sectionIndex].map((image, index) => (
                                        <button
                                            key={image.id}
                                            className={`w-2 h-2 rounded-full ${
                                                index === [currentImageIndex1, currentImageIndex2, currentImageIndex3,
                                                         currentImageIndex4, currentImageIndex5, currentImageIndex6][sectionIndex] 
                                                    ? 'bg-white' 
                                                    : 'bg-white/50'
                                            }`}
                                            onClick={() => {
                                                const setters = [setCurrentImageIndex1, setCurrentImageIndex2, setCurrentImageIndex3,
                                                               setCurrentImageIndex4, setCurrentImageIndex5, setCurrentImageIndex6];
                                                setters[sectionIndex](index);
                                                handleImageClick(image);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

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
            </main>
        </Layout>
    );
} 