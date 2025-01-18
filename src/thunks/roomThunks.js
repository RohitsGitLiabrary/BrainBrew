import { createAsyncThunk } from "@reduxjs/toolkit";
import { set, ref, serverTimestamp, push } from 'firebase/database';
import { db } from '../Firebase/Firebase';
import { fetchRoom } from "./fetchRoomThunk";

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


export const createRoom = createAsyncThunk(
    "room/createRoom",
    async (roomData, { rejectWithValue }) => {

        try {
            const roomID = generateRoomID();
            const hostID = generateID();

            const roomPayload = {
                roomName: roomData.roomName,
                roomID: roomID,
                numberOfPlayers: roomData.numberOfPlayers,
                hostName: roomData.roomCreaterName,
                stauts: "waiting",
                hostID: hostID,
                createdAt: serverTimestamp(),
                players: [],
            }
            await set(ref(db, 'rooms/' + roomID), roomPayload)

            const playersRef = ref(db, `rooms/${roomID}/players`);
            const hostData = {
                playername: roomData.roomCreaterName,
                playerID: hostID,
                isHost: true,
                score: 0,
                rank: 0,
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
            const roomInfo = dispatch(fetchRoom(roomData.roomID))
            const playerID = generateID();
            const playersRef = ref(db, `rooms/${roomData.roomID}/players`);
            const playerData = {
                playername: roomData.playerName,
                playerID: playerID,
                isHost: false,
                score: 0,
                rank: 0,
            }
            await push(playersRef, playerData);
            console.log(roomInfo)
            return { playerData, roomInfo };
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

