import React from "react";
import Quizquestion from "../components/Quizquestion";
import Leaderboard from "../components/Leaderboard";
import backgroundImage from "../assets/Images/quizBG.avif";


const QuizPage = () => {
    return (
        <div
            className="h-screen bg-cover bg-center  flex flex-col items-center justify-center text-black relative"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported image here
            }}
        >
            {/* Overlay for lightening the background image */}
            <div className="absolute inset-0 bg-white/70 z-0"></div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-screen-xxl h-full">
                {/* Left-Hand Side: Quiz Question */}
                <div className="w-full lg:w-3/4 p-4 flex items-center justify-center h-3/4 lg:h-full">
                    <Quizquestion />
                </div>

                <p className="block sm:hidden text-center bg-white/90 text-red-500 text-sm mt-0">
                    Scroll a Leaderboard
                </p>
                {/* Right-Hand Side: Leaderboard */}
                <div className="w-full lg:w-1/3 p-4 flex items-center justify-center h-1/4 lg:h-full scrollbar-hide">
                    <Leaderboard />
                </div>

            </div>
        </div>
    );
};

export default QuizPage;
