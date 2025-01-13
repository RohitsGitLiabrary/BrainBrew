import React from "react";

const Playerscorecard = ({ avatar, name, score, rank }) => {
    return (
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            {/* Rank */}
            <div className="w-12 flex items-center justify-center">
                {rank} {/* Medal or number */}
            </div>

            {/* Avatar */}
            <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full border-2 border-green-500 mr-4"
            />

            {/* Player Details */}
            <div className="flex-1">
                <p
                    className="text-lg font-bold text-gray-700"
                    style={{ fontFamily: "'Fredoka One', sans-serif" }}
                >
                    {name}
                </p>
            </div>
            <div className="text-lg font-semibold text-blue-500">{score}</div>
        </div>
    );
};

export default Playerscorecard;
