import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createRoom } from '../thunks/roomThunks'
import { useNavigate } from "react-router";

const Createroom = () => {
    const [roomName, setRoomName] = useState("");
    const [numberOfPlayers, setnNumberOfPlayers] = useState(0)
    const [roomCreaterName, setRoomCreaterName] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const room = useSelector((state) => state.room.room)

    const handleCreateRoom = async () => {
        setLoading(true)
        const roomData = { roomName, numberOfPlayers, roomCreaterName }
        dispatch(createRoom(roomData))
    }

    useEffect(() => {
        if (!room) return
        sessionStorage.setItem('roomCode', room.roomID)
        navigate('/Waitinglobby')
    }, [room])


    const isRoomDataValid = roomName !== "" && numberOfPlayers > 1 && roomCreaterName !== ""
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
                onChange={(e) => { setnNumberOfPlayers(parseInt(e.target.value)) }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="text"
                placeholder="Player Name"
                value={roomCreaterName}
                onChange={(e) => { setRoomCreaterName(e.target.value) }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition duration-300 flex justify-center items-center relative"
                onClick={() => handleCreateRoom()}
                disabled={!isRoomDataValid}
                style={{
                    cursor: !isRoomDataValid ? 'not-allowed' : 'pointer', // Change cursor dynamically
                }}
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                    'Create Room'
                )}
            </button>
        </div>
    );
};

export default Createroom;
