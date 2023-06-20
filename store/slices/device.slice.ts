import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StateType {
  value: 'MOBILE' | 'TABLET' | 'LAPTOP' | 'PC' | null
}

const deviceSlice = createSlice({
  name: 'device',
  initialState: { value: null },
  reducers: {
    setDevice: (state: StateType, action: PayloadAction<'MOBILE' | 'TABLET' | 'LAPTOP' | 'PC' | null>) => {
      state.value = action.payload
    },
  }
})

export const { setDevice } = deviceSlice.actions
export default deviceSlice