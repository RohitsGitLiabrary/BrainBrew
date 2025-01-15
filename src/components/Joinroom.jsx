import React, { use } from "react";
import { useDispatch } from 'react-redux'
import { joinRoom } from '../feature/Room/roomSlice'

const Joinroom = () => {
    const dispatch = useDispatch()
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black mb-4">Join Room</h2>
            <input
                type="text"
                placeholder="Player Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Room ID"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold"
                onClick={() => { dispatch(joinRoom()) }}
            >
                Join Room
            </button>
        </div>
    );
};

export default Joinroom;
