import { createSlice } from "@reduxjs/toolkit";

// create an initial state object
const initialState = {
    theme : null
}
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {

    // this is to set the theme state to the system theme if the os is light it will be light and if it is dark it will be dark
    setSystemTheme: (state, action) =>{
        state.theme = action.payload
    },
    toggleTheme: (state) =>{
     state.theme = state.theme === 'dark' ? 'light' : 'dark'
    }
    
  },
});

export const { toggleTheme, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer