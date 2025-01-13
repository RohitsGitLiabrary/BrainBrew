import React, { useState, useEffect } from "react";

const Quizquestion = () => {
    const [timeLeft, setTimeLeft] = useState(15); // Timer (hardcoded to 15 seconds)

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    return (
        <div className="relative bg-white/90 rounded-lg shadow-2xl h-[90%] w-11/12 lg:w-3/4 flex flex-col justify-between p-6">
            {/* BrainBrew Heading */}


            {/* Timer and Question */}
            <div className="flex justify-between items-center mb-4">
                <h2
                    className="text-3xl font-bold text-[#333333]"
                >
                    Question 1
                </h2>
                <div className="bg-red-500 text-white font-bold text-lg px-4 py-2 rounded-full">
                    {timeLeft} sec
                </div>
            </div>

            {/* Question */}
            <div className="mb-6">
                <p
                    className="text-2xl font-medium text-[#333333]"
                >
                    What is the capital of France?
                </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600">
                    A. Paris
                </button>
                <button className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600">
                    B. Berlin
                </button>
                <button className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600">
                    C. Madrid
                </button>
                <button className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600">
                    D. Rome
                </button>
            </div>
        </div>
    );
};

export default Quizquestion;
