import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Data} from "@/core/data/user.data";

interface StateType {
  value: Data.User | null
}

const userSlice = createSlice({
  name: 'user',
  initialState: { value: null },
  reducers: {
    setUser: (state: StateType, action: PayloadAction<Data.User>) => {
      state.value = action.payload
    },
    removeUser: (state: StateType) => {
      state.value = null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice