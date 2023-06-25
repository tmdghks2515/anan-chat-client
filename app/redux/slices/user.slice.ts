import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

// export const selectUserState = (state: AppState) => state.auth.authState;

export default userSlice