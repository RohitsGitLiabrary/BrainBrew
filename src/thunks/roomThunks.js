import { createAsyncThunk } from "@reduxjs/toolkit";
import { set, ref, serverTimestamp } from 'firebase/database';
import { db } from '../Firebase/Firebase';

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
                players: [{
                    player1: {
                        playername: roomData.roomCreaterName,
                        playerID: hostID,
                        isHost: true,
                        score: 0,
                        rank: 0
                    },
                }]
            }
            await set(ref(db, 'rooms/' + roomID), roomPayload)
            return { roomID, ...roomPayload };
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)