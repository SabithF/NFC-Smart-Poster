import React, { useEffect, useState } from 'react';
import { GridBackground } from './other_components/GridBackground';
import { Spotlight } from './other_components/spotlight';



const MainPage = () => {

    return (
        <section className='h-screen w-full relative overflow-hidden'>

            {/* background layer */}
            <div className="absolute inset-0 z-0">
                <GridBackground />
                <Spotlight />
            </div>

            {/* Contents on top of the bg  */}

            <div className="relative z-10 flex items-center justify-center h-full w-full ">
                <p className="block z-100 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
                    Background
                </p>

            </div>

            

        </section>
    )

}

export default MainPage;