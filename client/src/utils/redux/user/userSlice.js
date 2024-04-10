import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null,
    loading : false,
    error : null
}
// create a slice using createSlice API from redux toolkit
const userSlice = createSlice({
  name: "user", // A name used in the Redux store for this reducer. Must be unique among reducers. It is used as the key to store
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action.payload; // payload is data we recieve from the server
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStart: (state)=>{
      state.loading = true;
      state.error = null
    },
    updateSuccess: (state, action)=>{
      state.loading = false;
      state.error = null;
      state.userData = action.payload;
    },
    updateFailure: (state, action)=>{
      state.loading = false;
      state.error = action.payload
    },
    deleteSuccess: (state) =>{
      state.userData = null,
      state.error = null
    },
    deleteFailure : (state,action)=>{
      state.error = action.payload
    },
    signOutSuccess: (state) =>{
      state.userData = null
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteFailure,
  signOutSuccess
} = userSlice.actions;
export default userSlice.reducer