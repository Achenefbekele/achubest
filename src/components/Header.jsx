'use client'
import Link from 'next/link';
import Image from 'next/image';
import avatar from '../../public/icon/user.svg';
import powerbi from '../../public/icon/power-bi-icon.svg';
import logo from '../../public/logo/fhi360-logo.svg';
import { useState, useContext, useEffect } from 'react';
import { useRouter, redirect, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import dotenv from 'dotenv';

dotenv.config();

export default function Header() {
   
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuOpenPowerBI, setIsMenuOpenPowerBI] = useState(false);
    const [isEventsMenuOpen, setIsEventsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const { logout } = useContext(AuthContext);
    const pathname = usePathname();

    const getNavItemClasses = (path) => {
        const isActive = pathname === path;

        return `text-xl font-bold ${isActive ? ' text-[#D03000]' : 'hover:text-[#D03000]'}`;
    };

    const handleDropdownToggle = (dropdownName) => {
        if (activeDropdown === dropdownName) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdownName);
        }
    };

    function handleLogout() {
        logout(); // Log the user out
        // router.push('/signin'); // Redirect the user to sign-in page
        // window.location.reload();
        redirect('/signin');
    }
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-trigger')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header className='sticky top-0 z-50 flex justify-between items-center p-4 bg-white'>
            <Link href="/">
                <Image src={logo} alt="logo" width={80} height={80} />
            </Link>
            <nav className='hidden md:flex gap-8 text-lg font-bold rounded-full border-2 border-[#FF4719] p-2 px-6'>
                <Link href="/" className={getNavItemClasses('/')}>HOME</Link>
                <div className="flex flex-col items-center gap-2 relative">
                    <Link 
                        href="/about"
                        className={getNavItemClasses('/about')}
                    >
                        ABOUT US
                    </Link>
                    <button 
                        className="absolute right-[-20px] top-[5px] dropdown-trigger"
                        onClick={() => handleDropdownToggle('about')}
                    >
                        <svg 
                            className={`w-4 h-4 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {activeDropdown === 'about' && (
                        <div className="absolute left-0 top-[120%] bg-white border border-[#FF4719] rounded-lg shadow-lg p-4 flex flex-col gap-3 z-[100] min-w-[150px]">
                            <Link 
                                href="/about" 
                                className={getNavItemClasses('/about')} 
                                onClick={() => {
                                    handleDropdownToggle('about');
                                    setIsMobileNavOpen(false);
                                }}
                            >
                                About Us
                            </Link>
                            <Link 
                                href="/ecna" 
                                className={getNavItemClasses('/ecna')}
                                onClick={() => {
                                    handleDropdownToggle('about');
                                    setIsMobileNavOpen(false);
                                }}
                            >
                                ECNA
                            </Link>
                            <Link 
                                href="/ecna-staff" 
                                className={getNavItemClasses('/ecna-staff')}
                                onClick={() => {
                                    handleDropdownToggle('about');
                                    setIsMobileNavOpen(false);
                                }}
                            >
                                ECNA Staff
                            </Link>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button 
                        className={`text-xl font-bold dropdown-trigger ${pathname === '/events' ? 'text-[#D03000]' : 'hover:text-[#D03000]'} flex items-center gap-1`}
                        onClick={() => handleDropdownToggle('events')}
                    >
                        EVENTS
                        <svg 
                            className={`w-4 h-4 transition-transform ${activeDropdown === 'events' ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {activeDropdown === 'events' && (
                        <div className="absolute left-0 top-[120%] bg-white border border-[#FF4719] rounded-lg shadow-lg p-4 flex flex-col gap-3 z-[100] min-w-[150px]">
                            <Link 
                                href="/events" 
                                className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                onClick={() => handleDropdownToggle('events')}
                            >
                                All Events
                            </Link>
                            <Link 
                                href="/launching" 
                                className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                onClick={() => handleDropdownToggle('events')}
                            >
                                Launching
                            </Link>
                            <Link 
                                href="/news" 
                                className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                onClick={() => handleDropdownToggle('events')}
                            >
                                News
                            </Link>
                        </div>
                    )}
                </div>
                <Link 
                    href="/stories"
                    className={`text-xl font-bold ${
                        pathname === '/stories' ? 'text-[#D03000]' : 'hover:text-[#D03000]'
                    }`}
                    onClick={() => setIsMobileNavOpen(false)}
                >
                    STORIES
                </Link>
                <Link 
                    href="/resources"
                    className={`text-xl font-bold ${
                        pathname === '/resources' ? 'text-[#D03000]' : 'hover:text-[#D03000]'
                    }`}
                >
                    KNOWLEDGE
                </Link>
                <div className="relative">
                    <button 
                        className="text-xl font-bold hover:text-[#D03000] flex items-center gap-1 dropdown-trigger" 
                        onClick={() => handleDropdownToggle('powerbi')}
                    >
                        PowerBI
                        <svg 
                            className={`w-4 h-4 transition-transform ${activeDropdown === 'powerbi' ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {activeDropdown === 'powerbi' && (
                        <div className="absolute left-0 top-full mt-2  bg-white  border border-[#FF4719] rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50 min-w-[300px]">
                            <Link 
                                href="https://app.powerbi.com/groups/me/reports/26decd9c-ef41-4902-835b-4e3635a771b5/ReportSection?experience=power-bi" 
                                className="flex items-center w-full text-left text-lg font-bold hover:text-[#D03000] gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleDropdownToggle('powerbi')}
                            >
                                <Image src={powerbi} alt="powerbi" width={30} height={30} />
                                <span>PowerBI - Location</span>
                            </Link>
                            <Link 
                                href="https://app.powerbi.com/groups/me/reports/26decd9c-ef41-4902-835b-4e3635a771b5/ReportSection?experience=power-bi" 
                                className="flex items-center w-full text-left text-lg font-bold hover:text-[#D03000] gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleDropdownToggle('powerbi')}
                            >
                                <Image src={powerbi} alt="powerbi" width={30} height={30} />
                                <span>PowerBI - Performance</span>
                            </Link>
                            <Link 
                                href="https://app.powerbi.com/groups/me/reports/26decd9c-ef41-4902-835b-4e3635a771b5/ReportSection?experience=power-bi" 
                                className="flex items-center w-full text-left text-lg font-bold hover:text-[#D03000] gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleDropdownToggle('powerbi')}
                            >
                                <Image src={powerbi} alt="powerbi" width={30} height={30} />
                                <span>PowerBI - Survey</span>
                            </Link>
                        </div>
                    )}
                </div>

            </nav>
           
            <button className="hidden md:block border-2 border-[#FF4719] p-1 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Image src={avatar} alt="search" width={30} height={30} className='rounded-full' />
            </button>
            {isMenuOpen && (
                <div className="absolute right-4 top-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 pr-10 flex flex-col gap-3 z-50">
                
                  
                    <button className=" w-full flex items-center text-left text-lg font-bold hover:text-[#D03000] gap-2" onClick={handleLogout}>
                        <svg className="w-[32px] h-[32px] text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        
            <button className="block md:hidden" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                <svg className="w-[42px] h-[42px] text-[#FF4719]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6h-8m8 4H6m12 4h-8m8 4H6"/>
                </svg>
            </button>
            <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => setIsMobileNavOpen(false)} className="absolute top-4 right-4 text-lg font-bold text-[#FF4719]">
                    <svg className="w-[32px] h-[32px] text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </button>
                <nav className="flex flex-col gap-4 items-center justify-center h-full">
                    <Link href="/">
                        <Image src={logo} alt="logo" width={80} height={80} className='mb-6' />
                    </Link>
                    <Link href="/" className={getNavItemClasses('/')} onClick={() => setIsMobileNavOpen(false)}>Home</Link>
                    <div className="relative">
                        <button 
                            className={`text-xl font-bold dropdown-trigger ${pathname === '/about' ? 'text-[#D03000]' : 'hover:text-[#D03000]'} flex items-center gap-1`}
                            onClick={() => handleDropdownToggle('about')}
                        >
                            ABOUT US
                            <svg 
                                className={`w-4 h-4 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {activeDropdown === 'about' && (
                            <div className="absolute left-0 top-[120%] bg-white border border-[#FF4719] rounded-lg shadow-lg p-4 flex flex-col gap-3 z-[100] min-w-[150px]">
                                <Link 
                                    href="/about" 
                                    className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                    onClick={() => handleDropdownToggle('about')}
                                >
                                    About Us
                                </Link>
                                <Link 
                                    href="/ecna" 
                                    className={getNavItemClasses('/ecna')}
                                    onClick={() => {
                                        handleDropdownToggle('about');
                                        setIsMobileNavOpen(false);
                                    }}
                                >
                                    ECNA
                                </Link>
                                <Link 
                                    href="/ecna-staff" 
                                    className={getNavItemClasses('/ecna-staff')}
                                    onClick={() => {
                                        handleDropdownToggle('about');
                                        setIsMobileNavOpen(false);
                                    }}
                                >
                                    ECNA Staff
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button 
                            className={`text-xl font-bold dropdown-trigger ${pathname === '/events' ? 'text-[#D03000]' : 'hover:text-[#D03000]'} flex items-center gap-1`}
                            onClick={() => handleDropdownToggle('events')}
                        >
                            EVENTS
                            <svg 
                                className={`w-4 h-4 transition-transform ${activeDropdown === 'events' ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {activeDropdown === 'events' && (
                            <div className="absolute left-0 top-[120%] bg-white border border-[#FF4719] rounded-lg shadow-lg p-4 flex flex-col gap-3 z-[100] min-w-[150px]">
                                <Link 
                                    href="/events" 
                                    className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                    onClick={() => handleDropdownToggle('events')}
                                >
                                    All Events
                                </Link>
                                <Link 
                                    href="/launching" 
                                    className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                    onClick={() => handleDropdownToggle('events')}
                                >
                                    Launching
                                </Link>
                                <Link 
                                    href="/news" 
                                    className="text-lg font-bold hover:text-[#D03000] whitespace-nowrap"
                                    onClick={() => handleDropdownToggle('events')}
                                >
                                    News
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link 
                        href="/stories"
                        className={`text-xl font-bold ${
                            pathname === '/stories' ? 'text-[#D03000]' : 'hover:text-[#D03000]'
                        }`}
                        onClick={() => setIsMobileNavOpen(false)}
                    >
                        STORIES
                    </Link>
                    <Link 
                        href="/resources"
                        className={`text-xl font-bold ${
                            pathname === '/resources' ? 'text-[#D03000]' : 'hover:text-[#D03000]'
                        }`}
                    >
                        RESOURCES
                    </Link>
                    <hr className="w-[60%] border-t border-[#FF4719] my-4" />

                    <Link 
                        href="https://app.powerbi.com/groups/me/reports/26decd9c-ef41-4902-835b-4e3635a771b5/ReportSection?experience=power-bi" 
                        className="flex items-center w-full text-left text-lg font-bold hover:text-[#D03000] gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDropdownToggle('powerbi')}
                    >
                        <Image src={powerbi} alt="powerbi" width={30} height={30} />

                        <span >PowerBI - Location</span>
                    </Link>
                    <Link 
                        href="https://app.powerbi.com/groups/me/reports/26decd9c-ef41-4902-835b-4e3635a771b5/ReportSection?experience=power-bi" 
                        className="flex items-center w-full text-left text-lg font-bold hover:text-[#D03000] gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDropdownToggle('powerbi')}
                    >
                        <Image src={powerbi} alt="powerbi" width={30} height={30} />

                        <span >PowerBI - Performance</span>
                    </Link>
                    <Link 
                        href="https://app.powerbi.com/groups/me/reports/26decd9c-ef41-4902-835b-4e3635a771b5/ReportSection?experience=power-bi" 
                        className="flex items-center w-full text-left text-lg font-bold hover:text-[#D03000] gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDropdownToggle('powerbi')}
                    >
                        <Image src={powerbi} alt="powerbi" width={30} height={30} />

                        <span >PowerBI - Survey</span>
                    </Link>
                    <button className=" flex items-center text-left text-lg font-bold hover:text-[#D03000] gap-2" onClick={handleLogout}>
                        <svg className="w-[32px] h-[32px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                        </svg>
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}
