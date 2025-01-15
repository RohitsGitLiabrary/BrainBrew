import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { createRoom } from '../feature/Room/roomSlice'

const Createroom = () => {
    const [roomName, setRoomName] = useState("");
    const [numberOfPlayers, setnNumberOfPlayers] = useState(0)
    const [roomCreaterName, setRoomCreaterName] = useState("")

    const dispatch = useDispatch()

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black mb-4">Create Room</h2>
            <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => { setRoomName(e.target.value) }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="number"
                min="2"
                max="10"
                placeholder="Number of Players"
                value={numberOfPlayers}
                onChange={(e) => { setnNumberOfPlayers(e.target.value) }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="text"
                placeholder="Player Name"
                value={roomCreaterName}
                onChange={(e) => { setRoomCreaterName(e.target.value) }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold"
                onClick={() => dispatch(createRoom(roomName, numberOfPlayers, roomCreaterName))}
            >
                Create Room
            </button>
        </div>
    );
};

export default Createroom;
