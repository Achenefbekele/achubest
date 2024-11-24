"use client";
import Image from "next/image";
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {  AuthContext } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';



export default function Signin() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("username", username);
    console.log("password", password);

    try {
      const res = await fetch('/api/auth/signin', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify({ username, password }), 
      }); 
      const data = await res.json(); 
      if (res.ok) { 
        console.log('Login successful:', data.token); 
        login(data.token);
        toast.success('Login successful!', {
          duration: 3000,
          position: 'top-center',
          style: { background: '#4CAF50', color: '#fff' },
        });
        router.push('/');
      } else { 
        setError(data.message);
        toast.error(data.message || 'Login failed', {
          duration: 3000,
          position: 'top-center',
          style: { background: '#FF4719', color: '#fff' },
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Toaster />
    <div className='w-[500px] flex flex-col m-auto gap-3 px-5'>
      <div className='flex justify-center'>
        <Image src="/logo/fhi360-logo.svg" alt="Logo" width={150} height={150}/> 
      </div>
      <div className='flex flex-col w-full gap-1 mb-4'>
        <h1 className='text-[40px]'><span className='text-red-500'>Welcome</span><br /> to FHI 360 Ethiopia</h1>
        <p className='text-[#c7c7c7bb]'>Sign in to access resources...</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-10'>  
        <div className="flex flex-col gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border-2 border-gray-100 rounded-md focus:outline-none focus:border-[#FF4719]"
          />
        </div>
        <div className="relative">
          <input 
            type="password" 
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-2 border-gray-100 rounded-md focus:outline-none focus:border-[#FF4719]"
          />
        </div>
        </div>
        <button className='bg-[#D03000] text-lg text-white w-full py-2 rounded-md' disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
    </div>
  );
}
