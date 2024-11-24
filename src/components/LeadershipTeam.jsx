"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import teams from '@/data/staff';
export default function LeadershipTeam() {
  const [selectedTeam, setSelectedTeam] = useState('Central Team');
  


  return (
    <section className='flex flex-col justify-center w-full align-middle gap-10 p-20'>
      <h1 className='text-5xl text-center '>Meet the <span className='font-bold text-[#D03000]'>team</span> </h1>
      <nav className='flex gap-6 w-full justify-start md:justify-center text-2xl overflow-x-auto whitespace-nowrap pb-5 px-4'>
        {Object.keys(teams).map((team) => (
          <button 
            key={team} 
            onClick={() => setSelectedTeam(team)} 
            className="hover:text-[#D03000] whitespace-nowrap"
          >
            {team}
          </button>
        ))}
      </nav>
      <div className="flex justify-start md:justify-center w-full gap-14 mt-8 overflow-x-auto whitespace-nowrap pb-5">
        {teams[selectedTeam].map((member, index) => (
          <TeamMember
            key={`${member.id}-${index}`}
            member={member}
          />
        ))}
      </div>
    </section>
  );
}

function TeamMember({ member }) {
  const router = useRouter();

  const handleStaffClick = (id) => {
    router.push(`/staff/${id}`);
  };
    return (
      <div className="relative group text-center inline-block cursor-pointer" onClick={() => handleStaffClick(member.id)}>
        <Image
          src={member.imageSrc}
          alt={member.name}
          width={128} // Set the width
          height={128} // Set the height
          className="rounded-full mx-auto"
        />
        <h2 className="text-xl font-bold mt-4">{member.name}</h2>
        <p className="text-sm text-gray-600">{member.title}</p>
      
      </div>
    );
  }