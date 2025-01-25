import { createAsyncThunk } from "@reduxjs/toolkit";
import { set, ref, serverTimestamp, push, get, remove, update } from 'firebase/database';
import { db } from '../Firebase/Firebase';
import { fetchRoom } from "./fetchRoomThunk";
import avatars from "../assets/Avatars/avatars";
import axios from "axios";
function generateRoomID(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let roomID = '';
    for (let i = 0; i < length; i++) {
        roomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomID;
}

function generateID(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${id}`;
}


const getAvatar = async (roomID) => {
    try {
        const roomRef = ref(db, `rooms/${roomID}/availableAvatars`);
        const snapshot = await get(roomRef);

        if (snapshot.exists()) {
            const avatars = snapshot.val();
            if (Object.keys(avatars).length > 0) {
                const [key, url] = Object.entries(avatars)[0];
                // Delete the avatar from the database
                const avatarToDeleteRef = ref(db, `rooms/${roomID}/availableAvatars/${key}`);
                await remove(avatarToDeleteRef);
                // Return the URL of the avatar
                return url;
            } else {
                throw new Error("No available avatars");
            }
        } else {
            throw new Error("No avatars found for this room");
        }
    } catch (error) {
        return null; // Return null or handle error appropriately
    }
};

const getQuestion = async (numberOfQuestions, category, difficultyLevel) => {
    try {
        const response = await axios({
            // Endpoint to send the request
            url: `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficultyLevel}`,
            method: "GET"
        });
        // Return the data from the response
        return response.data;
    } catch (err) {
        console.error("Error fetching questions:", err.message);
        throw err; // Re-throw the error if needed
    }
}


export const createRoom = createAsyncThunk(
    "room/createRoom",
    async (roomData, { rejectWithValue }) => {

        try {
            const roomID = generateRoomID();
            const hostID = generateID();
            // const questions = await getQuestion(roomData.numberOfQuestions, roomData.category, roomData.difficultyLevel)

            const roomPayload = {
                roomName: roomData.roomName,
                roomID: roomID,
                numberOfPlayers: roomData.numberOfPlayers,
                hostName: roomData.roomCreaterName,
                roomStatus: "waiting",
                hostID: hostID,
                createdAt: serverTimestamp(),
                players: [],
                availableAvatars: avatars,
                // questionDB: questions
            }
            await set(ref(db, 'rooms/' + roomID), roomPayload)
            localStorage.setItem('currentPlayerID', hostID)
            const url = await getAvatar(roomID); // Wait for the promise to resolve
            const [avatar] = Object.values(url)
            console.log(avatar)
            const playersRef = ref(db, `rooms/${roomID}/players`);
            const hostData = {
                playername: roomData.roomCreaterName,
                playerID: hostID,
                isHost: true,
                score: 0,
                rank: 0,
                avatar: avatar
            }
            await push(playersRef, hostData);

            return { roomID, ...roomPayload, hostData };
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)


export const joinRoom = createAsyncThunk(
    "room/joinRoom",
    async (roomData, { dispatch, rejectWithValue }) => {
        try {
            const playerID = generateID();
            const url = await getAvatar(roomData.roomID); // Wait for the promise to resolve
            const [avatar] = Object.values(url)
            const playersRef = ref(db, `rooms/${roomData.roomID}/players`);
            const playerData = {
                playername: roomData.playerName,
                playerID: playerID,
                isHost: false,
                score: 0,
                rank: 0,
                avatar: avatar
            }
            await push(playersRef, playerData);
            localStorage.setItem('currentPlayerID', playerID)
            const roomPayload = dispatch(fetchRoom(roomData.roomID))
            return { playerData, roomPayload };
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const startGame = createAsyncThunk(
    "room/startRoom",
    async (roomID, rejectWithValue) => {
        const updates = {
            [`rooms/${roomID}/roomStatus`]: "in-progress"
        };

        if (true) {
            update(ref(db), updates)
                .then(() => { return ("Username updated successfully") })
                .catch((error) => { return rejectWithValue("Failed to update username:", error) });
        }
    }
)

