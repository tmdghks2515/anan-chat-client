import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StateType {
  value: 'MASTER' | 'SHOP_ADMIN' | 'MANAGER' | null
}

const modeSlice = createSlice({
  name: 'mode',
  initialState: { value: null },
  reducers: {
    setMode: (state: StateType, action: PayloadAction<'MASTER' | 'SHOP_ADMIN' | 'MANAGER' | null>) => {
      state.value = action.payload
    },
  }
})

export const { setMode } = modeSlice.actions
export default modeSlice