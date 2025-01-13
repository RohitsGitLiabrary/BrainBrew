import React from "react";
import { FaMedal } from "react-icons/fa";
import backgroundImage from "../assets/Images/quizBG.avif";
import avatars from "../assets/Avatars/avatars";

const WinnerPage = () => {

    const winners = [
        {
            name: "Player One",
            avatar: avatars.avatar1,
            score: 100,
        },
        {
            name: "Player Two",
            avatar: avatars.avatar2,
            score: 90,
        },
        {
            name: "Player Three",
            avatar: avatars.avatar3,
            score: 80,
        },
    ];
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-black relative"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported background image here
            }}
        >
            {/* Overlay for lightening the background image */}
            <div className="absolute inset-0 bg-white/70 z-0"></div>

            {/* Content div with a light background and black text */}
            <div className="relative z-10 bg-white/90 p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 text-center">
                <h1 className="text-4xl sm:text-5xl mb-4 text-[#333333]" style={{ fontFamily: '"Brush Script MT", cursive' }}>
                    BrainBrew
                </h1>
                <h3 className="text-xl sm:text-2xl mb-4 text-[#333333]">Winners</h3>

                {/* Player Cards */}
                <div className="flex flex-col items-center space-y-6">
                    {winners.map((winner, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-72"
                        >
                            {/* Avatar */}
                            <img
                                src={winner.avatar}
                                alt={winner.name}
                                className="w-12 h-12 rounded-full border-2 border-green-500 mr-4"
                            />

                            {/* Player Details - Aligning Name and Rank to Left */}
                            <div className="flex-1 text-left">
                                <p
                                    className="text-lg font-bold text-gray-700"
                                    style={{
                                        fontFamily: "'Fredoka One', sans-serif",
                                    }}
                                >
                                    {winner.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Rank {index + 1}
                                </p>
                            </div>

                            {/* Score and Medal */}
                            <div className="flex items-center">
                                <p className="text-lg font-semibold text-blue-500 mr-2">
                                    {winner.score}
                                </p>
                                <FaMedal className="text-yellow-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 justify-center mt-8">
                    <button
                        onClick={() => window.location.href = "/"}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        Return to Homepage
                    </button>
                    <button
                        onClick={() => window.location.href = "/Roommanager"}
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                    >
                        Create Room Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WinnerPage;
