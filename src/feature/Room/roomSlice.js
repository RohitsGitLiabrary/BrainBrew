import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        createRoom: () => {
            alert("Create Room Working !")
        },
        joinRoom: () => {
            alert("Join Room Working !")
        },
    },
})

export const { createRoom, joinRoom } = roomSlice.actions

export default roomSlice.reducer