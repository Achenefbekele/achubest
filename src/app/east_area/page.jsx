"use client";
import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import Image from 'next/image';

export default function EastAreaPage() {
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const [showMore3, setShowMore3] = useState(false);
    const [showMore4, setShowMore4] = useState(false);
    const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
    const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
    const [currentImageIndex3, setCurrentImageIndex3] = useState(0);
    const [currentImageIndex4, setCurrentImageIndex4] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const fafanImages = [
        {
            id: 1,
            src: '/image/east_area/east/somali1.jpeg',
            title: 'Fafan Zone Team Member 1',
            bio: 'Bio will be added soon'
        },
        {
            id: 2,
            src: '/image/east_area/east/somali2.jpeg',
            title: 'Fafan Zone Team Member 2',
            bio: 'Bio will be added soon'
        },
        {
            id: 3,
            src: '/image/east_area/east/somali3.jpg',
            title: 'Fafan Zone Team Member 3',
            bio: 'Bio will be added soon'
        },
        {
            id: 4,
            src: '/image/east_area/east/somali4.jpg',
            title: 'Fafan Zone Team Member 4',
            bio: 'Bio will be added soon'
        }
    ];

    const jararImages = [
        {
            id: 5,
            src: '/image/east_area/east/somali6.jpg',
            title: 'Jarar Zone Team Member 1',
            bio: 'Bio will be added soon'
        },
        {
            id: 6,
            src: '/image/east_area/east/somali7.jpg',
            title: 'Jarar Zone Team Member 2',
            bio: 'Bio will be added soon'
        },
        {
            id: 7,
            src: '/image/east_area/east/somali3.jpg',
            title: 'Jarar Zone Team Member 3',
            bio: 'Bio will be added soon'
        },
        {
            id: 8,
            src: '/image/east_area/east/somali4.jpg',
            title: 'Jarar Zone Team Member 4',
            bio: 'Bio will be added soon'
        }
    ];

    const sitiImages = [
        {
            id: 9,
            src: '/image/east_area/east/somali1.jpeg',
            title: 'Siti Zone Team Member 1',
            bio: 'Bio will be added soon'
        },
        {
            id: 10,
            src: '/image/east_area/east/somali2.jpeg',
            title: 'Siti Zone Team Member 2',
            bio: 'Bio will be added soon'
        },
        {
            id: 11,
            src: '/image/east_area/east/somali3.jpg',
            title: 'Siti Zone Team Member 3',
            bio: 'Bio will be added soon'
        },
        {
            id: 12,
            src: '/image/east_area/east/somali4.jpg',
            title: 'Siti Zone Team Member 4',
            bio: 'Bio will be added soon'
        }
    ];

    const diredewaImages = [
        {
            id: 13,
            src: '/image/east_area/east/somali1.jpeg',
            title: 'Diredewa Region Team Member 1',
            bio: 'Bio will be added soon'
        },
        {
            id: 14,
            src: '/image/east_area/east/somali2.jpeg',
            title: 'Diredewa Region Team Member 2',
            bio: 'Bio will be added soon'
        },
        {
            id: 15,
            src: '/image/east_area/east/somali3.jpg',
            title: 'Diredewa Region Team Member 3',
            bio: 'Bio will be added soon'
        },
        {
            id: 16,
            src: '/image/east_area/east/somali4.jpg',
            title: 'Diredewa Region Team Member 4',
            bio: 'Bio will be added soon'
        }
    ];

    const imagesArrays = [
        fafanImages,
        jararImages,
        sitiImages,
        diredewaImages
    ];

    const sectionContents = [
        {
            title: "Fafan Zone",
            mainText: "The Feed the Future Ethiopia Community Nutrition Activity in Fafan Zone, led by FHI 360, is part of USAID's comprehensive initiative to improve nutritional outcomes. The project focuses on strengthening nutrition services and increasing accessibility for women, children, and adolescent girls in this vital zone of the Somali region.",
            expandedText: "In Fafan Zone, we implement targeted interventions that address the specific nutritional challenges of pastoralist communities. Our initiative works closely with local communities, healthcare providers, and traditional leaders to deliver sustainable nutrition solutions tailored to the unique needs of this area."
        },
        {
            title: "Jarar Zone",
            mainText: "The Feed the Future Ethiopia Community Nutrition Activity in Jarar Zone implements innovative approaches to address nutrition challenges. Our work focuses on strengthening local health systems and improving access to quality nutrition services for vulnerable populations in this important zone.",
            expandedText: "Working with communities in Jarar Zone, we've developed specialized programs that consider the pastoral lifestyle and local context. Our approach combines modern nutrition science with community engagement to create lasting positive change in nutritional practices."
        },
        {
            title: "Siti Zone",
            mainText: "In Siti Zone, our nutrition program addresses unique challenges through targeted interventions and community engagement. The project emphasizes building local capacity and improving access to essential nutrition services for women, children, and adolescent girls in this diverse region.",
            expandedText: "Through comprehensive community mobilization in Siti Zone, we're working to transform nutrition practices and build resilient food systems. Our programs emphasize local ownership and sustainable approaches to ensure long-term impact on community health."
        },
        {
            title: "Diredewa Region",
            mainText: "The Feed the Future Ethiopia Community Nutrition Activity in Diredewa Region takes an urban-focused approach to improving nutrition outcomes. Our work emphasizes strengthening urban health systems and increasing access to quality nutrition services for city residents.",
            expandedText: "In Diredewa Region, we implement innovative urban nutrition solutions, working with city administration and local stakeholders. The initiative addresses the unique challenges of urban nutrition while promoting sustainable practices for improved community health."
        }
    ];

    useEffect(() => {
        const timers = imagesArrays.map((_, index) => {
            return setInterval(() => {
                const setCurrentIndex = [
                    setCurrentImageIndex1,
                    setCurrentImageIndex2,
                    setCurrentImageIndex3,
                    setCurrentImageIndex4
                ][index];
                
                setCurrentIndex(prevIndex => 
                    prevIndex === imagesArrays[index].length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);
        });

        return () => timers.forEach(timer => clearInterval(timer));
    }, []);

    const handleImageClick = (clickedImage) => {
        setSelectedImage(clickedImage);
    };

    const toggleReadMore = (sectionIndex) => {
        const setters = [setShowMore1, setShowMore2, setShowMore3, setShowMore4];
        const states = [showMore1, showMore2, showMore3, showMore4];
        setters[sectionIndex](!states[sectionIndex]);
    };

    return (
        <Layout>
            <main className="flex flex-col items-center min-h-screen">
                {/* Hero Section */}
                <div className="w-full bg-[#FF4719] text-white py-4 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-1">
                            East Area Office
                        </h1>
                        <p className="text-lg">
                            Empowering communities and fostering sustainable development in East Ethiopia
                        </p>
                    </div>
                </div>

                {/* Modified Four Sections */}
                {[0, 1, 2, 3].map((sectionIndex) => (
                    <div key={sectionIndex} className="container mx-auto px-4 py-8">
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-[#FF4719] mb-6">
                                    {sectionContents[sectionIndex].title}
                                </h2>
                                
                                <p className="text-lg">
                                    {sectionContents[sectionIndex].mainText}
                                </p>

                                {[showMore1, showMore2, showMore3, showMore4][sectionIndex] && (
                                    <p className="text-lg animate-fade-in">
                                        {sectionContents[sectionIndex].expandedText}
                                    </p>
                                )}

                                <button 
                                    onClick={() => toggleReadMore(sectionIndex)}
                                    className="bg-[#FF4719] text-white font-bold py-2 px-4 rounded hover:bg-[#ff5733] transition-colors"
                                >
                                    {[showMore1, showMore2, showMore3, showMore4][sectionIndex] ? 'Read Less' : 'Read More'}
                                </button>
                            </div>

                            <div className="relative h-[400px] mt-0">
                                {imagesArrays[sectionIndex].map((image, index) => (
                                    <div
                                        key={image.id}
                                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 cursor-pointer ${
                                            index === [
                                                currentImageIndex1,
                                                currentImageIndex2,
                                                currentImageIndex3,
                                                currentImageIndex4
                                            ][sectionIndex] 
                                                ? 'opacity-100 z-10' 
                                                : 'opacity-0 z-0'
                                        }`}
                                        onClick={() => handleImageClick(image)}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={`${image.title} - ${image.id}`}
                                            fill
                                            className="object-cover rounded-lg"
                                            priority={true}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                            <p className="text-center">Click to view bio {image.id}</p>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                    {imagesArrays[sectionIndex].map((image, index) => (
                                        <button
                                            key={image.id}
                                            className={`w-2 h-2 rounded-full ${
                                                index === [
                                                    currentImageIndex1,
                                                    currentImageIndex2,
                                                    currentImageIndex3,
                                                    currentImageIndex4
                                                ][sectionIndex] ? 'bg-white' : 'bg-white/50'
                                            }`}
                                            onClick={() => {
                                                const setCurrentIndex = [
                                                    setCurrentImageIndex1,
                                                    setCurrentImageIndex2,
                                                    setCurrentImageIndex3,
                                                    setCurrentImageIndex4
                                                ][sectionIndex];
                                                setCurrentIndex(index);
                                                handleImageClick(image);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Bio Modal */}
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
