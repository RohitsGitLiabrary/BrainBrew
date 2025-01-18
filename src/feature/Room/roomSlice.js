import { createSlice } from '@reduxjs/toolkit'
import { createRoom } from '../../thunks/roomThunks';
import { fetchRoom } from '../../thunks/fetchRoomThunk'

export const roomSlice = createSlice({

    name: "room",
    initialState: {
        room: null,
        loading: false,
        error: null
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
                state.room = action.payload;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Capture error message
            });
    }
})


export default roomSlice.reducer;