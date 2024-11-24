import national from '../../public/image/National_1.jpg';
import Image from 'next/image';

export default function ProgramsOverview() {
    return (
        <section className="flex flex-col gap-10">
            {/* First Section */}
            <div className="flex items-center min-h-screen bg-white py-10 px-4 sm:px-8 md:px-20 lg:px-32">
                <div className="flex flex-col md:flex-row items-center mx-auto gap-8 md:gap-20">
                    <div className="relative w-60 h-60 sm:w-80 sm:h-80 md:w-[32rem] md:h-[32rem] flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] md:border-[20px] border-r-transparent border-orange-500 z-10 p-6 sm:p-12 md:p-24"></div>
                        <div className="absolute inset-6 rounded-full overflow-hidden z-0">
                            <Image
                                src={national}
                                alt="Featured"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 text-center md:text-left px-4 sm:px-8 md:px-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                            Health and Wellness Initiatives
                        </h1>
                        <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
                            We are dedicated to improving health outcomes in Ethiopia, focusing on HIV and AIDS prevention and care. Our initiatives strengthen community and healthcare systems, providing high-quality support to those impacted by HIV and enhancing awareness through strategic behavior change communication.
                        </p>
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9] py-10 px-4 sm:px-8 md:px-20 lg:px-32">
                <div className="flex flex-col-reverse md:flex-row items-center mx-auto gap-8 md:gap-20">
                    <div className="mt-6 md:mt-0 text-center md:text-left px-4 sm:px-8 md:px-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                        Empowering Education

                        </h1>
                        <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
                        Partnering with Ethiopia Ministry of Education, we advance equitable and quality education. Through active learning approaches, we help create student-centered classrooms, ensuring that children across the country have access to effective and inclusive education.
                        </p>
                    </div>
                    <div className="relative w-60 h-60 sm:w-80 sm:h-80 md:w-[32rem] md:h-[32rem] flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] md:border-[20px] border-l-transparent border-orange-500 z-10 p-6 sm:p-12 md:p-24"></div>
                        <div className="absolute inset-6 rounded-full overflow-hidden z-0">
                            <Image
                                src={national}
                                alt="Featured"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Section */}
            <div className="flex min-h-screen bg-white py-10 px-4 sm:px-8 md:px-20 lg:px-32">
                <div className="flex flex-col md:flex-row items-center mx-auto gap-8 md:gap-20">
                    <div className="relative w-60 h-60 sm:w-80 sm:h-80 md:w-[32rem] md:h-[32rem] flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] md:border-[20px] border-r-transparent border-orange-500 z-10 p-6 sm:p-12 md:p-24"></div>
                        <div className="absolute inset-6 rounded-full overflow-hidden z-0">
                            <Image
                                src={national}
                                alt="Featured"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 text-center md:text-left px-4 sm:px-8 md:px-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                            Building Sustainable Capacity

                        </h1>
                        <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
                            FHI 360 supports local and national institutions in building the skills and resources needed to tackle Ethiopia’s most pressing development challenges. Our work spans nutrition, family planning, and maternal and child health, promoting sustainable solutions that drive positive, lasting change.


                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
