import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';  // Firebase's database API
import { db } from '../Firebase/Firebase';

// Async thunk to fetch room data by room ID
export const fetchRoom = createAsyncThunk(
    'room/fetchRoom',
    async (roomCode, { rejectWithValue }) => {
        try {
            // const roomID = sessionStorage.getItem('roomID')
            // Get the room reference from the database using roomID
            const roomRef = ref(db, 'rooms/' + roomCode);

            // Fetch the room data
            const snapshot = await get(roomRef);

            if (!snapshot.exists()) {
                throw new Error('Room not found');
            }

            // Return the room data
            return snapshot.val();
        } catch (error) {
            // Handle errors and return them as a rejected value
            return rejectWithValue(error.message);
        }
    }
);
