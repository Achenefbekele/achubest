"use client"
import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import Image from 'next/image';

export default function TigrayPage() {
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const [showMore3, setShowMore3] = useState(false);
    const [showMore4, setShowMore4] = useState(false);
    const [showMore5, setShowMore5] = useState(false);
    const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
    const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
    const [currentImageIndex3, setCurrentImageIndex3] = useState(0);
    const [currentImageIndex4, setCurrentImageIndex4] = useState(0);
    const [currentImageIndex5, setCurrentImageIndex5] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    // Update images array to match Oromia's structure
    const images = [
        {
            id: 1,
            src: '/image/tigray/tigray_1.JPG',
            title: 'Tigray Team Member 1',
            bio: 'This image showcases a community health initiative in Tigray, where local health workers are being trained on essential healthcare practices.'
        },
        {
            id: 2,
            src: '/image/tigray/tigray_2.JPG',
            title: 'Tigray Team Member 2',
            bio: 'A glimpse into an educational support program where students are actively engaged in learning.'
        },
        {
            id: 3,
            src: '/image/tigray/tigray_3.JPG',
            title: 'Tigray Team Member 3',
            bio: 'Community members participating in a sustainable development workshop.'
        },
        {
            id: 4,
            src: '/image/tigray/tigray_4.JPG',
            title: 'Tigray Team Member 4',
            bio: 'An agricultural development project in action, showing local farmers implementing sustainable farming techniques.'
        },
        {
            id: 5,
            src: '/image/tigray/tigray_5.JPG',
            title: 'Tigray Team Member 5',
            bio: 'Healthcare outreach program in action, demonstrating the commitment to bringing essential medical services.'
        }
    ];

    // Update imagesArrays for 5 sections
    const imagesArrays = [
        images,
        images.map(img => ({...img, id: img.id + 5})),
        images.map(img => ({...img, id: img.id + 10})),
        images.map(img => ({...img, id: img.id + 15})),
        images.map(img => ({...img, id: img.id + 20}))
    ];

    // Update section titles
    const sectionTitles = [
        "Central Tigray Zone",
        "Southern Tigray Zone",
        "South East Tigray Zone",
        "Eastern Tigray Zone",
        "North West Tigray Zone"
    ];

    // Update useEffect for 5 sections
    useEffect(() => {
        const timers = imagesArrays.map((_, index) => {
            return setInterval(() => {
                const setCurrentIndex = [
                    setCurrentImageIndex1,
                    setCurrentImageIndex2,
                    setCurrentImageIndex3,
                    setCurrentImageIndex4,
                    setCurrentImageIndex5
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
        const index = images.findIndex(img => img.id === clickedImage.id);
        const setters = [setCurrentImageIndex1, setCurrentImageIndex2, setCurrentImageIndex3, setCurrentImageIndex4, setCurrentImageIndex5];
        setters.forEach(setter => setter(index));
    };

    // Update toggleReadMore for 5 sections
    const toggleReadMore = (sectionIndex) => {
        const setters = [setShowMore1, setShowMore2, setShowMore3, setShowMore4, setShowMore5];
        const states = [showMore1, showMore2, showMore3, showMore4, showMore5];
        setters[sectionIndex](!states[sectionIndex]);
    };

    return (
        <Layout>
            <main className="flex flex-col items-center min-h-screen">
                {/* Hero Section */}
                <div className="w-full bg-[#FF4719] text-white py-4 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-1">
                            Tigray Area Office
                        </h1>
                        <p className="text-lg">
                            Empowering communities and fostering sustainable development in Tigray
                        </p>
                    </div>
                </div>

                {/* Replace the single section with a map over all 5 sections */}
                {[0, 1, 2, 3, 4].map((sectionIndex) => (
                    <div key={sectionIndex} className="container mx-auto px-4 py-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-[#FF4719] mb-6">
                                    {sectionTitles[sectionIndex]}
                                </h2>
                                
                                <p className="text-lg">
                                    The Feed the Future Ethiopia Community Nutrition Activity in Tigray 
                                    region, led by FHI 360, is part of USAID comprehensive initiative 
                                    to improve nutritional outcomes. The project focuses on strengthening 
                                    nutrition services and increasing accessibility for women, children, 
                                    and adolescent girls in the Tigray region.
                                </p>

                                {[showMore1, showMore2, showMore3, showMore4, showMore5][sectionIndex] && (
                                    <p className="text-lg animate-fade-in">
                                        In Tigray, the project implements targeted interventions that 
                                        address the specific nutritional challenges of the region. The 
                                        initiative works closely with local communities and healthcare 
                                        providers to deliver sustainable nutrition solutions.
                                    </p>
                                )}

                                <button 
                                    onClick={() => toggleReadMore(sectionIndex)}
                                    className="bg-[#FF4719] text-white font-bold py-2 px-4 rounded hover:bg-[#ff5733] transition-colors"
                                >
                                    {[showMore1, showMore2, showMore3, showMore4, showMore5][sectionIndex] ? 'Read Less' : 'Read More'}
                                </button>
                            </div>

                            {/* Right Column */}
                            <div className="relative h-[300px] md:h-[400px]">
                                {imagesArrays[sectionIndex].map((image, index) => (
                                    <div
                                        key={image.id}
                                        className={`absolute w-full h-full transition-opacity duration-500 cursor-pointer ${
                                            index === [currentImageIndex1, currentImageIndex2, currentImageIndex3, currentImageIndex4, currentImageIndex5][sectionIndex] 
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
                                                index === [currentImageIndex1, currentImageIndex2, currentImageIndex3, currentImageIndex4, currentImageIndex5][sectionIndex] 
                                                    ? 'bg-white' 
                                                    : 'bg-white/50'
                                            }`}
                                            onClick={() => {
                                                const setters = [setCurrentImageIndex1, setCurrentImageIndex2, setCurrentImageIndex3, setCurrentImageIndex4, setCurrentImageIndex5];
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
