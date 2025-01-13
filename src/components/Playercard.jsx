import React from "react";

const Playercard = ({ name, avatar }) => {
    return (
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-green-500"
            />
            <p className="text-[#333333] font-semibold text-lg">{name}</p>
        </div>
    );
};

export default Playercard;
