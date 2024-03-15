import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
// create a store using configureStore API from redux toolkit
export const store = configureStore({
    reducer:{
        user: userReducer
    }
});