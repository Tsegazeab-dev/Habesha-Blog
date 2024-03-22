import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setSystemTheme} from '../utils/redux/theme/themeSlice'

export default function ThemeProvider({children}) {
   const {theme} = useSelector(state => state.persistedReducer.theme)
   const dispatch = useDispatch()
   console.log(theme)
   useEffect(()=>{

    // to check if the system preference theme is dark or not
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      dispatch(setSystemTheme("dark"))
    else dispatch(setSystemTheme("light"))
   },[])
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 x:w-[50%] dark:text-gray-200 dark:bg-gray-800 min-h-screen">
        {children}
      </div>
    </div>
  );
}
