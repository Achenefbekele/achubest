"use client";
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import teams from '@/data/staff';
import Image from 'next/image';

export default function StaffPage({ params }) {
    const [staffMember, setStaffMember] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        (async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
            console.log("id event", resolvedParams.id);
        })();
    }, [params]);

    useEffect(() => {
        if (id) {
            let foundStaff = null;
            for (const team in teams) {
                foundStaff = teams[team].find(staff => staff.id === Number(id));
                if (foundStaff) break;
            }
            setStaffMember(foundStaff);
        }
    }, [id]);

    if (!id) {
        return <p>Loading...</p>;
    }

    if (!staffMember) {
        return (
            <Layout>
                <main className='flex flex-col items-center w-full min-h-[100vh]'>
                    <div className='flex flex-col gap-7 justify-center w-full max-w-[600px] px-4 pt-10'>   
                        <h1 className='text-3xl md:text-5xl font-bold'>Staff Member Not Found</h1>
                        <p className='text-base md:text-lg font-semibold'>The staff member you are looking for does not exist.</p>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className='flex flex-col items-center w-full min-h-[100vh] pb-32'>
                <div className='flex flex-col gap-7 justify-center items-center w-full max-w-[800px] px-10 py-32 relative'>
                <div className='absolute top-0 left-0 w-full h-1/3 bg-[#293745] rounded-xl'></div>

                    <div className='flex flex-col gap-4 justify-center items-center'>
                        <div className='flex flex-col items-center w-[300px] relative'>
                            <Image src={staffMember.imageSrc} alt={staffMember.name} width={300} height={300} className='w-full h-auto' />
                        </div>

                            <h1 className='text-3xl md:text-5xl font-bold'>{staffMember.name}</h1>
                            <p className='text-base md:text-lg font-semibold'>{staffMember.title}</p>
                     </div>
                    <p className='text-base md:text-lg font-medium'>{staffMember.details}</p>
                </div>
            </main>
        </Layout>
    );
}
