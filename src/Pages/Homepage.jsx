import React from 'react'
import backgroundImage from "../assets/Images/quizBG.avif";
import { useNavigate } from 'react-router';
import he from "he"

const Homepage = () => {
    const navigate = useNavigate()
    return (
        <div
            className="h-screen bg-cover bg-center  flex flex-col items-center justify-center text-black relative"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported image here
            }}
        >
            {/* Overlay for lightening the background image */}
            <div className="absolute inset-0 bg-white/70 z-0"></div>

            {/* Content div with a light background and black text */}
            <div className="relative z-10 bg-opacity-4000 bg-white/90 p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 text-center">
                {/* Change font for BrainBrew heading */}
                <h1 className="text-4xl sm:text-5xl mb-4 text-[#333333]" style={{ fontFamily: '"Brush Script MT", cursive' }}
                >BrainBrew</h1>
                <h3 className="text-xl sm:text-2xl mb-4 text-[#333333]">Welcome to BrainBrew!</h3>
                <p className="text-sm sm:text-lg mb-6 text-[#333333]">
                    Challenge your knowledge and have fun with our interactive quiz platform! Explore a variety of topics, test your skills, and compete with friends or go solo to achieve your best score. With engaging questions and a user-friendly interface, learning has never been this exciting. Ready to take the quiz? Dive in and start playing now!
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold text-lg sm:text-xl"
                    onClick={() => { navigate("/Roommanager") }}
                >
                    Let's get started
                </button>
            </div>
        </div >
    );
};

export default Homepage