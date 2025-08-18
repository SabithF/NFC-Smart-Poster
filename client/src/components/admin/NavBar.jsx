import React, { useState, useEffect } from 'react';


export default function NavBar () {

     useEffect(() => {
        const toggleBtn = document.querySelector('[data-collapse-toggle]');
        const mobileMenu = document.getElementById('mobile-menu');
    
        const toggleMenu = () => {
          mobileMenu?.classList.toggle('hidden');
        };
    
        toggleBtn?.addEventListener('click', toggleMenu);
    
        return () => {
          toggleBtn?.removeEventListener('click', toggleMenu);
        };
      }, []);


      return(
        <>
                 {/* NAVBAR */}
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/assets/img/Logo.png" className="h-12" alt="Logo" />
              <span className="self-center text-2xl font-semibold dark:text-white whitespace-nowrap">
                NFC Smart Poster
              </span>
            </a>

            {/* Search & Hamburger */}
            <div className="flex md:order-2 items-center gap-2">
              
              {/* Search (large screens only) */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                             bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>

              {/* Hamburger */}
              <button
                type="button"
                data-collapse-toggle="mobile-menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500
                           rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none
                           focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 6h14M3 12h14M3 18h14" />
                </svg>
              </button>
            </div>

            {/* Top Links (Large Screens Only) */}
            
          </div>
        </nav>

        {/* Mobile Dropdown Menu (Only Small Screens) */}
        <div
          id="mobile-menu"
          className="md:hidden hidden flex flex-col justify-center items-center space-y-2 px-4 pt-4 pb-2 bg-gray-900 text-white"
        >
          <a href="/dashboard" className="inline-flex items-center justify-center w-32 h-10 border border-white/20 rounded-full bg-gray-800 text-white text-sm font-medium hover:text-blue-400 transition">Dashboard</a>
          <a href="/vouchers" className="inline-flex items-center justify-center w-32 h-10 border border-white/20 rounded-full bg-gray-800 text-white text-sm font-medium hover:text-blue-400 transition">Vouchers</a>
          <a href="/users" className="inline-flex items-center justify-center w-32 h-10 border border-white/20 rounded-full bg-gray-800 text-white text-sm font-medium hover:text-blue-400 transition">User Details</a>
        </div>

        {/* Center Floating Nav (Visible Only in Large Screens) */}
        <div className="hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit px-6 py-2 
              bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full 
              items-center space-x-6">
          <a href="/dashboard" className="text-white font-medium text-sm hover:text-blue-400 transition">Dashboard</a>
          <a href="/vouchers" className="text-white font-medium text-sm hover:text-blue-400 transition">Vouchers</a>
          <a href="/users" className="text-white font-medium text-sm hover:text-blue-400 transition">User Details</a>
        </div>
                
        </>

      )

}