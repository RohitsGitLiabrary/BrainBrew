import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { joinRoom } from "../thunks/roomThunks";
import { useNavigate } from "react-router";


const Joinroom = () => {

    const [playerName, setPlayerName] = useState("")
    const [roomID, setRoomID] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isRoomDataValid = playerName !== "" && roomID !== ""
    const room = useSelector((state) => state.room.room);
    const handleJoinRoon = () => {
        setLoading(true)
        const roomData = { playerName, roomID }
        dispatch(joinRoom(roomData))
    }
    useEffect(() => {
        if (!room) return
        sessionStorage.setItem('roomCode', room.roomID)
        navigate('/Waitinglobby')

    }, [room])
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md" >
            <h2 className="text-xl font-bold text-black mb-4">Join Room</h2>
            <input
                type="text"
                value={playerName}
                onChange={(e) => { setPlayerName(e.target.value) }}
                placeholder="Player Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Room ID"
                value={roomID}
                onChange={(e) => { setRoomID(e.target.value) }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold rounded-lg font-bold transition duration-300 flex justify-center items-center relative"
                onClick={() => handleJoinRoon()}
                disabled={!isRoomDataValid}
                style={{
                    cursor: !isRoomDataValid ? 'not-allowed' : 'pointer', // Change cursor dynamically
                }}
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                    'Join Room'
                )}

            </button>
        </div >

    );
};

export default Joinroom;
