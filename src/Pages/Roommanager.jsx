import React from "react";
import Createroom from "../components/Createroom"
import Joinroom from "../components/Joinroom";
import backgroundImage from '../assets/Images/quizBG.avif'

const Roommanager = () => {
    return (
        <div
            className="h-screen bg-cover bg-center  flex flex-col items-center justify-center text-black relative"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported image here
            }}
        >
            {/* Overlay for lightening the background image */}
            <div className="absolute inset-0 bg-white/70 z-0"></div>

            {/* Responsive Container for Create and Join Room */}
            <div className="relative z-10 bg-opacity-400 bg-white/90 p-6 sm:p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 text-center">
                <h1 className="text-4xl sm:text-5xl mb-4 text-[#333333]" style={{ fontFamily: '"Brush Script MT", cursive' }}
                >BrainBrew</h1>

                {/* Grid for Create and Join Room */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                    {/* Create Room */}
                    <div className="flex-1 flex">
                        <Createroom />
                    </div>

                    {/* Divider with "OR" */}
                    <div className="text-black text-xl font-bold text-center md:mx-4">
                        OR
                    </div>

                    {/* Join Room */}
                    <div className="flex-1 flex">
                        <Joinroom />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roommanager;
