import React from "react";
import Playerscorecard from "./Playerscorecard";

const Leaderboard = () => {
    const players = [
        { id: 1, name: "Alice", score: 120, avatar: "https://i.pravatar.cc/50?img=1" },
        { id: 2, name: "Bob", score: 100, avatar: "https://i.pravatar.cc/50?img=2" },
        { id: 3, name: "Charlie", score: 80, avatar: "https://i.pravatar.cc/50?img=3" },
        { id: 4, name: "David", score: 60, avatar: "https://i.pravatar.cc/50?img=4" },
        { id: 5, name: "Emma", score: 50, avatar: "https://i.pravatar.cc/50?img=5" },
        { id: 6, name: "Frank", score: 40, avatar: "https://i.pravatar.cc/50?img=6" },
        { id: 7, name: "Grace", score: 30, avatar: "https://i.pravatar.cc/50?img=7" },
        { id: 8, name: "Hannah", score: 20, avatar: "https://i.pravatar.cc/50?img=8" },
        { id: 9, name: "Ian", score: 10, avatar: "https://i.pravatar.cc/50?img=9" },
        { id: 10, name: "Jack", score: 5, avatar: "https://i.pravatar.cc/50?img=10" },
    ];



    return (
        <div className="bg-white/90 rounded-lg shadow-lg h-full p-6 flex flex-col w-full lg:w-[80%]">
            {/* Leaderboard Header */}
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Fredoka One', sans-serif" }} >
                Leaderboard
            </h2>

            {/* Scrollable Player Cards */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    {players.map((player, index) => (
                        <Playerscorecard
                            key={player.id}
                            avatar={player.avatar}
                            name={player.name}
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
