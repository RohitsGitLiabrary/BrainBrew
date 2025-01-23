import React, { useEffect, useState } from "react";
import Playercard from "../components/Playercard"; // Import the PlayerCard component
import backgroundImage from "../assets/Images/quizBG.avif";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../thunks/fetchRoomThunk";
import { ref, onValue } from "firebase/database";
import { db } from "../Firebase/Firebase";
import { startGame } from "../thunks/roomThunks";
import { useNavigate } from "react-router";


const Waitinglobby = () => {

    const [playerList, setPlayerList] = useState([])
    const [loader, setLoader] = useState(false)
    const [isHost, setIsHost] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Access the room state, loading, and error
    const { loading, error } = useSelector((state) => state.room);
    const room = useSelector((state) => state.room);

    const roomCode = sessionStorage.getItem('roomCode'); // Get roomID from sessionStorage
    const currentPlayerID = localStorage.getItem('currentPlayerID')

    // Fetch room details on component mount
    useEffect(() => {
        if (roomCode) {
            dispatch(fetchRoom(roomCode)); // Fetch room data using the roomID
        }
    }, [dispatch, roomCode]);
    useEffect(() => {
        if (room.room !== null) {
            // setPlayerList(Object.values(room.room.players))

            const starCountRef = ref(db, 'rooms/' + roomCode + '/players');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setPlayerList(Object.values(data))
            });
            if (currentPlayerID === room.room.hostID) {
                setIsHost(true)
            }
        }
    }, [room]);
    useEffect(() => {
        if (room.room !== null) {
            const starCountRef = ref(db, 'rooms/' + roomCode + '/roomStatus');
            onValue(starCountRef, (snapshot) => {
                const gameStatus = snapshot.val();
                if (gameStatus === "in-progress") {
                    navigate("/Quizpage")
                }
            });
        }
    }, [room]);
    const handleStartGame = async () => {
        setLoader(true)
        if (currentPlayerID === room.room.hostID) {
            dispatch(startGame(room.room.roomID))
        }
    }

    // Handle loading state
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-bold text-gray-700">Loading...</p>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-bold text-red-500">
                    Error: {error || "Unable to load room details"}
                </p>
            </div>
        );
    }

    // Handle case when room data is not available yet
    if (!room || !room.room) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-bold text-gray-500">Room data is not available.</p>
            </div>
        );
    }

    return (
        <div
            className="h-screen bg-cover bg-center flex items-center justify-center text-black relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            {/* Overlay for lightening the background image */}
            <div className="absolute inset-0 bg-white/70 z-0"></div>

            {/* Content Box */}
            <div className="relative z-10 w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 bg-white/90 rounded-lg shadow-lg flex flex-col h-[90%]">
                {/* Sticky Top Section */}
                <div className="sticky top-0 z-20 bg-white/90 p-6 rounded-t-lg">
                    {/* Heading */}
                    <h1
                        className="text-3xl sm:text-4xl mb-4 text-[#333333] text-center"
                        style={{ fontFamily: '"Brush Script MT", cursive' }}
                    >
                        BrainBrew
                    </h1>

                    {/* Room ID */}
                    <p className="text-lg sm:text-xl mb-4 text-[#333333] text-center">
                        Room Name: <span className="text-green-600">{room.room.roomName}</span>
                    </p>
                    <p className="text-lg sm:text-xl mb-4 text-[#333333] text-center">
                        Room ID: <span className="text-green-600">{room.room.roomID}</span>
                    </p>
                </div>

                {/* Scrollable Player List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {playerList.map((player) => (
                            <Playercard
                                key={player.playerID}
                                name={player.playername}
                                avatar={player.avatar}
                            />
                        ))}
                    </div>

                </div>
                {/* Sticky Bottom Section */}
                <div className="sticky bottom-0 z-20 bg-white/90 p-4 rounded-b-lg">
                    {isHost &&
                        <button button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-bold text-lg transition duration-300 flex justify-center items-center relative"
                            onClick={() => { handleStartGame() }}
                        >
                            {loader ? (
                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                            ) : (
                                'Start Game'
                            )}
                        </button>
                    }
                    {isHost ? "" : (<p className="text-sm text-gray-500 mt-2 text-center">
                        Only the host can start the game.
                    </p>
                    )}

                </div>
            </div>
        </div >
    );
};

export default Waitinglobby;