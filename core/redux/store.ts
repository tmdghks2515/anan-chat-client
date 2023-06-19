import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import modeSlice from "./slices/mode.slice";
import deviceSlice from "./slices/device.slice";
import { persistReducer } from "redux-persist"
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    }
  }
}

const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['user', 'mode', 'device']
}

const reducers = combineReducers({
  user: userSlice.reducer,
  mode: modeSlice.reducer,
  device: deviceSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
    // devTools: process.env.NODE_ENV === 'development'
  })
}

// store 생성
const store = makeStore()

// store 엑스포트
export default store

export type RootState = ReturnType<typeof persistedReducer>;