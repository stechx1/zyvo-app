'use client';
import firebase_app from '@/config';
import { CommonContext } from '@/context/CommonContext';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';

export const ProfileDropdown = ({ photoURL }: { photoURL: string }) => {
  const auth = getAuth(firebase_app);
  const { mode, setMode } = useContext(CommonContext);
  const router = useRouter();

  const userProfileDropdownLinks = [
    { name: 'Payment History', route: '/payments' },
    { name: 'Notifications', route: '/' },
    { name: 'Help Center', route: '/help' },
    { name: 'Settings', route: '/account-settings' },
    { name: 'Whishlists', route: '/wishlist' },
  ];

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleModeChange = () => {
    let newMode: 'GUEST' | 'HOST';
    if (mode === 'GUEST') {
      newMode = 'HOST';
    } else {
      newMode = 'GUEST';
    }
    setMode(newMode);
    toggleDropdown();
    localStorage.setItem(
      'zyvo-data:mode',
      btoa(
        JSON.stringify({
          mode: newMode,
        })
      )
    );
  };
  return (
    <div className='relative group cursor-pointer' ref={dropdownRef}>
      <Image
        src={photoURL ? photoURL : '/icons/profile-icon.png'}
        alt='profile-pic'
        width={43}
        height={43}
        className={`rounded-full border border-gray-400 bg-gray-400 ${
          !photoURL && 'opacity-50'
        }`}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className='absolute py-4 px-4 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg'>
          <button
            className='py-2 mb-3 w-full border border-secondary-gray-700 rounded-xl bg-white text-secondary-gray-700 hover:bg-secondary-gray-100 hover:text-secondary-gray-700 focus:outline-none'
            onClick={handleModeChange}
          >
            Switch to{' '}
            <span className='capitalize'>
              {mode === 'GUEST' ? 'Host' : mode === 'HOST' ? 'Guest' : ''}
            </span>
          </button>

          <ul>
            {userProfileDropdownLinks.map((menuItem, index) => (
              <li
                className='px-4 py-[8px] hover:bg-secondary-gray-100 place rounded-xl'
                key={index}
              >
                <Link
                  onClick={toggleDropdown}
                  href={menuItem.route}
                  className='text-[#3F3D56] text-md font-normal'
                >
                  {menuItem.name}
                </Link>
              </li>
            ))}

            <div className='h-[0.5px] my-3 opacity-[0.20] bg-secondary-gray-700'></div>

            <li className='px-4 py-[8px] hover:bg-secondary-gray-100  place rounded-xl'>
              <Link
                href='/'
                onClick={() => {
                  auth.signOut();
                  router.push('/signin');
                }}
                className='text-[#3F3D56] text-md font-normal'
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
