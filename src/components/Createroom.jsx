import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createRoom } from '../thunks/roomThunks'
import { useNavigate } from "react-router";

const Createroom = () => {
    const [roomName, setRoomName] = useState("");
    const [numberOfPlayers, setnNumberOfPlayers] = useState("")
    const [roomCreaterName, setRoomCreaterName] = useState("")
    const [loading, setLoading] = useState(false)
    const [numberOfQuestions, setNumberOfQuestions] = useState("")
    const [category, setCategory] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const room = useSelector((state) => state.room.room)

    const handleCreateRoom = async () => {
        setLoading(true)
        const roomData = { roomName, numberOfPlayers, roomCreaterName, numberOfQuestions, category, difficultyLevel }
        dispatch(createRoom(roomData))
    }

    useEffect(() => {
        if (!room) return
        sessionStorage.setItem('roomCode', room.roomID)
        navigate('/Waitinglobby')
    }, [room])


    const isRoomDataValid = roomName !== "" && numberOfPlayers > 1 && roomCreaterName !== ""
    return (
        <div div className="bg-gray-100 p-6 rounded-lg shadow-md">
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

            <select
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                <option value="" disabled>Select Number of Questions</option>
                <option value="5">5 Question</option>
                <option value="10">10 Question</option>
                <option value="15">15 Question</option>
                <option value="20">20 Question</option>
            </select>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                <option value="" disabled>Select Category</option>
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="23">History</option>
                <option value="22">Geography</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="20">Mythology</option>
                <option value="30">Science: Gadgets</option>
                <option value="17">Science & Nature</option>
                <option value="19">Science: Mathematics</option>
                <option value="18">Science: Computers</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="29">Entertainment: Comics</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animations</option>
            </select>

            <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                <option value="" disabled>Select Difficulty Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition duration-300 flex justify-center items-center relative"
                onClick={() => handleCreateRoom()}
                disabled={!isRoomDataValid}
                style={{
                    cursor: !isRoomDataValid ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                    'Create Room'
                )}
            </button>
        </div >

    );
};

export default Createroom;
