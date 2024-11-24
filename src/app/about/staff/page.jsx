'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const staffImages = [
    '/image/National_1.jpg',
    '/image/National_3.jpg',
    '/image/National_4.jpg',
    '/image/National_4a.jpg',
    '/image/National_6.jpg'
];

const staffBio = `Achenef Kidane is an accomplished data scientist and clinical researcher with over ten years of experience in managing and analyzing clinical and surveillance data. He has demonstrated expertise in data processing, manipulation, storage, and presentation, alongside advanced statistical software like Stata and in programming languages such as R and Python. His proficiency extends to web development and content management systems, evidenced by his creation of a website for Asbedale consultancy service. He is highly skilled in developing and maintaining Standard Operating Procedures (SOPs) related to data management and curation, ensuring the integrity and privacy of data in all his projects`;

const countryOffice = {
  title: 'Country Office',
  sections: [
    {
      title: 'Operation and Finance',
      summary: 'Our Operation and Finance team manages financial resources and ensures operational efficiency across all our programs.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Data Scientist', bio: staffBio, image }))
    },
    {
      title: 'Program',
      summary: 'The Program team oversees the implementation and management of our various initiatives and projects.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Program Manager', bio: staffBio, image }))
    },
    {
      title: 'Technical Staffs',
      summary: 'Our technical team provides expert guidance and support across all program areas.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Technical Advisor', bio: staffBio, image }))
    },
    {
      title: 'LME',
      summary: 'The Learning, Monitoring, and Evaluation team ensures program quality and measures impact.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'LME Specialist', bio: staffBio, image }))
    }
  ]
};

const areaOffices = {
  title: 'Area Offices',
  sections: [
    {
      title: 'Oromia',
      summary: 'Coordinating activities and programs throughout the Oromia region.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Regional Coordinator', bio: staffBio, image }))
    },
    {
      title: 'Amhara',
      summary: 'Managing programs and initiatives in the Amhara region.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Regional Coordinator', bio: staffBio, image }))
    },
    {
      title: 'Tigray',
      summary: 'Overseeing operations and programs in the Tigray region.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Regional Coordinator', bio: staffBio, image }))
    },
    {
      title: 'South',
      summary: 'Implementing programs across the Southern regions.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Regional Coordinator', bio: staffBio, image }))
    },
    {
      title: 'Somali',
      summary: 'Coordinating activities in the Somali region.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Regional Coordinator', bio: staffBio, image }))
    },
    {
      title: 'Afar',
      summary: 'Managing programs in the Afar region.',
      staff: staffImages.map(image => ({ name: 'Achenef Kidane', title: 'Regional Coordinator', bio: staffBio, image }))
    }
  ]
};

export default function ECNA_Staff() {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const renderStaffSection = (section) => (
    <div key={section.title} className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-[#FF6B35]">{section.title}</h3>
      <p className="mb-6 text-gray-700">{section.summary}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {section.staff.map((staff, index) => (
          <div 
            key={index}
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => setSelectedStaff(staff)}
          >
            <div className="relative h-48 mb-2">
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h4 className="font-medium text-center">{staff.name}</h4>
            <p className="text-sm text-gray-600 text-center">{staff.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-[#FF6B35]">ECNA Staff</h1>
      
      {/* Country Office Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#FF6B35]">{countryOffice.title}</h2>
        {countryOffice.sections.map(renderStaffSection)}
      </div>

      {/* Area Offices Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#FF6B35]">{areaOffices.title}</h2>
        {areaOffices.sections.map(renderStaffSection)}
      </div>

      {/* Staff Profile Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full relative">
            <button
              onClick={() => setSelectedStaff(null)}
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
                      src={selectedStaff.image}
                      alt={selectedStaff.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-[#FF6B35]">{selectedStaff.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedStaff.title}</p>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{selectedStaff.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 