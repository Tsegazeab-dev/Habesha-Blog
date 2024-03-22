import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import themeReducer from './theme/themeSlice.js'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// to combine morethan one  reducer, we use the combineReducers
const rootReducer = combineReducers({
    user: userReducer,
    theme : themeReducer
})

// set persist config  for saving state in local storage
const persistConfig = {
    key : "root",
    storage,
    version: 1
}
// create a persisted reducer to use it in the store
const persistedReducer = persistReducer(persistConfig, rootReducer)

// create a store using configureStore API from redux toolkit
export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export  const persistor = persistStore(store);