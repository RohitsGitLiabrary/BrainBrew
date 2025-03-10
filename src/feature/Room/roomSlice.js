import { createSlice } from '@reduxjs/toolkit'
import { createRoom, joinRoom } from '../../thunks/roomThunks';
import { fetchRoom } from '../../thunks/fetchRoomThunk'

export const roomSlice = createSlice({

    name: "room",
    initialState: {
        room: null,
        loading: false,
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoom.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error before starting fetch
            })
            .addCase(fetchRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;  // Store fetched room data
            })
            .addCase(fetchRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Handle any errors from fetch
            })
            .addCase(createRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.room = { ...action.payload, playerList: [action.payload.players] };
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Capture error message
            })
            .addCase(joinRoom.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error before starting fetch
            })
            .addCase(joinRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload.roomData; // Update room data
            })
            .addCase(joinRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Handle any errors from fetch
            })
    }
})


export default roomSlice.reducer;