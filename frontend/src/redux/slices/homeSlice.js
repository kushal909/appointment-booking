import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  title: "Welcome to My React App",
  count: 0
}

const homeSlice = createSlice({
  name: "home",

  initialState,

  reducers: {
    increment: (state) => {
      state.count += 1
    },

    decrement: (state) => {
      state.count -= 1
    }
  }
})

export const {
  increment,
  decrement
} = homeSlice.actions

export default homeSlice.reducer