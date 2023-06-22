'use client'
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import modeSlice from "./slices/mode.slice";
import deviceSlice from "./slices/device.slice";
import { persistReducer } from "redux-persist"
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import persistStore from "redux-persist/es/persistStore";

const storage = createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['user', 'mode', 'device']
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
  mode: modeSlice.reducer,
  device: deviceSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
    devTools: process.env.NODE_ENV !== 'production'
  })
}


// store 생성 및 export
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const ReduxStoreProvider = ({ children }) => (
//     <Provider store={store}>{children}</Provider>
// )

// export type RootState = ReturnType<typeof persistedReducer>;