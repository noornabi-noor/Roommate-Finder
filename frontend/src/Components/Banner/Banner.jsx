import React from 'react';
import banner from '../../assets/rm-hero-banner-1.jpg';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
    return (
        <div className="w-full relative aspect-[18/9] mt-5 overflow-hidden rounded-2xl transition-shadow duration-300">

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${banner})` }}
            ></div>

            <div className="relative z-10 flex flex-col items-center h-full px-4 sm:px-2 py-10 justify-center text-center">
                <div className="space-y-3 w-full sm:w-3/4 md:w-1/2 lg:max-w-md text-blue-400">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        <Typewriter
                            words={['Find roommates that match your lifestyle.']}
                            loop={false}
                            cursor
                            cursorStyle="|"
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1000}
                        />
                    </h2>

                    <button className="px-4 py-2 rounded-lg bg-black text-white mt-2 text-base">
                        Join Now
                    </button>

                    <h3 className="font-medium text-base md:text-lg mt-1">
                        Free to list, search & communicate
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Banner;