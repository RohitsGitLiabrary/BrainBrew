import React from "react";

const Createroom = () => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black mb-4">Create Room</h2>
            <input
                type="text"
                placeholder="Room Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="number"
                min="2"
                max="10"
                placeholder="Number of Players"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="text"
                min="2"
                max="10"
                placeholder="Player Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold">
                Create Room
            </button>
        </div>
    );
};

export default Createroom;
