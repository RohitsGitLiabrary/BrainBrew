import React, { useEffect, useState } from "react";
import Playerscorecard from "./Playerscorecard";
import { fetchRoom } from "../thunks/fetchRoomThunk";
import { useDispatch, useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase/Firebase";

const Leaderboard = () => {
    const [playerList, setPlayerList] = useState([])

    const dispatch = useDispatch()

    const roomCode = sessionStorage.getItem('roomCode')
    const room = useSelector((state) => state.room);
    useEffect(() => {
        if (roomCode) {
            dispatch(fetchRoom(roomCode)); // Fetch room data using the roomID
        }
    }, [dispatch, roomCode]);


    useEffect(() => {
        if (room.room !== null) {
            const starCountRef = ref(db, 'rooms/' + roomCode + '/players');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setPlayerList(Object.values(data))
            });
        }
    }, [room]);



    return (
        <div className="bg-white/90 rounded-lg shadow-lg h-full p-6 flex flex-col w-full lg:w-[80%]">
            {/* Leaderboard Header */}
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Fredoka One', sans-serif" }} >
                Leaderboard
            </h2>

            {/* Scrollable Player Cards */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    {playerList.map((player, index) => (
                        <Playerscorecard
                            key={player.id}
                            avatar={player.avatar}
                            name={player.playername}
                            score={player.score}
                            rank={(index + 1)} // Pass rank with medals or numbers
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
