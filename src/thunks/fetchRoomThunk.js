import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';  // Firebase's database API
import { db } from '../Firebase/Firebase';

// Async thunk to fetch room data by room ID
export const fetchRoom = createAsyncThunk(
    'room/fetchRoom',
    async (roomCode, { rejectWithValue }) => {
        try {
            const roomRef = ref(db, 'rooms/' + roomCode);
            const snapshot = await get(roomRef);
            if (!snapshot.exists()) {
                throw new Error('Room not found');
            }
            return snapshot.val();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
