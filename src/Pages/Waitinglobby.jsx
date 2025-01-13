import React from "react";
import Playercard from "../components/Playercard"; // Import the PlayerCard component
import backgroundImage from "../assets/Images/quizBG.avif";
import avatars from "../assets/Avatars/avatars";

const Waitinglobby = () => {
    const roomId = "AB123"; // Room ID
    const players = [
        { id: 1, name: "Player 1", avatar: avatars.avatar1 },
        { id: 2, name: "Player 2", avatar: avatars.avatar2 },
        { id: 3, name: "Player 3", avatar: avatars.avatar3 },
        { id: 4, name: "Player 4", avatar: avatars.avatar4 },
        { id: 5, name: "Player 5", avatar: avatars.avatar5 },
        { id: 6, name: "Player 6", avatar: avatars.avatar6 },
        { id: 7, name: "Player 7", avatar: avatars.avatar7 },
        { id: 8, name: "Player 8", avatar: avatars.avatar8 },
        { id: 9, name: "Player 9", avatar: avatars.avatar9 },
        { id: 10, name: "Player 10", avatar: avatars.avatar10 },
    ]; // List of players

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
                        Room ID: <span className="text-green-600">{roomId}</span>
                    </p>
                </div>

                {/* Scrollable Player List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {players.map((player) => (
                            <Playercard
                                key={player.id}
                                name={player.name}
                                avatar={player.avatar}
                            />
                        ))}
                    </div>
                </div>

                {/* Sticky Bottom Section */}
                <div className="sticky bottom-0 z-20 bg-white/90 p-4 rounded-b-lg">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-bold text-lg">
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Waitinglobby;
