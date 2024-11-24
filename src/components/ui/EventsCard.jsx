"use client"
import Image from "next/image";

export default function EventsCard(data) {
    return (
        <div className="max-w-full md:w-[700px] flex flex-col md:flex-row rounded overflow-hidden shadow-lg m-4 bg-[#F4F4F4] transform transition-transform duration-300 hover:scale-105">
            <Image src={data.image} alt={data.title} width={500} height={500} className="w-full md:w-[50%]" />
            <div className="px-6 py-4 w-full md:w-[50%]">
                <h2 className="text-lg font-semibold hover:underline hover:text-[#D03000]">
                    {data.title}
                </h2>
                <p className="text-gray-700 text-base mt-2">
                    {data.description}
                </p>
                <p className="text-[#D03000] text-base mt-2">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>
        </div>
    )
}