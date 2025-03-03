import React, { useEffect, useState } from "react";
import Playerscorecard from "./Playerscorecard";
import { fetchRoom } from "../thunks/fetchRoomThunk";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase/Firebase";

const Leaderboard = () => {
    const [playerList, setPlayerList] = useState([])

    // const dispatch = useDispatch()

    const roomCode = sessionStorage.getItem('roomCode')
    const room = useSelector((state) => state.room);

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
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Fredoka One', sans-serif" }}>
                Leaderboard
            </h2>

            {/* Scrollable Player Cards */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <AnimatePresence>
                        {playerList
                            .sort((a, b) => b.score - a.score) // ✅ Sort players by score (highest first)
                            .map((player, index) => (
                                <motion.div
                                    key={player.id}
                                    layout // ✅ Enables smooth ranking movement
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15 }} // ✅ Smooth transition
                                >
                                    <Playerscorecard
                                        avatar={player.avatar}
                                        name={player.playername}
                                        score={player.score}
                                        rank={`#${index + 1}`} // Numeric rank (e.g., #1, #2, #3)
                                    />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
