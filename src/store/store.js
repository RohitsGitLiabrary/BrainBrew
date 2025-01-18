import { configureStore } from '@reduxjs/toolkit'
import roomReducer from "../feature/Room/roomSlice"

export const store = configureStore({
    reducer: { room: roomReducer },
})