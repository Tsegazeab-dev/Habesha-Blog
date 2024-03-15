# MERN BLOG App
## Setup frontend environment
   * Tailwind for vite := `https://tailwindcss.com/docs/guides/vite`
   * Before using Flowbite UI Library we should include some files into tailwind.config.css
   * Flowbite DOC := `https://www.flowbite-react.com/` 

## Header Component
 * `useLocation()` := hook we used to get the url of the current page.
 * ```
    const path = useLocation().pathname

    N.B:= useLocation is a hook imported from react router dom
   ```
 * we make the navbar link active if we  are on that page by comparing the pathname
 * e.g:= if we are on home page path="/" and the navbar link Home becomes active
 * `div before the navbar link` := we use md:order-2 because after the medium screen size the navbar links should be displayed befor the div below. if we change the position of navbar.collapse instead of using order-2 below the medium screen when hamburger menu clicked the navbar links will be displayed before the div below and that creates a mess.


## Create a server

## Error Handler middleware
 ```
  app.use(function (err, req, res, next) {
     message = err.message || "Internal server error"
     statusCode = err.statusCode || 500
     res.status(statusCode).json({
        success: false,
        statusCode,
        message
     })
  })

 ```
 * To make our custom errors delivered using middleware we must give them similar look
   * `utils folder`  > `errorHandler js file`
   ```
    export const customError = (status, message)=>{
       let error = new Error()
       error.statusCode = status;
       error.message = message
       return error;
    }

    so we can pass the status and message to the function and it will create an error object with a status code and error message. Therefore we don't need to write error message everytime
   ```

## Fetching from the backend server
 * `fetch("/api/auth/signup")` :- this will fetch from the frontend port means if the frontend port is 3000 it will be `fetch('localhost:3000/api/auth/signup')`
 * to send the request to the backend port we have to add proxy inside the vite configuration
  ```
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },

  for the requests that starts with /api the base url or the target will be changed to http://localhost:3000
  ```


## Signin api route
 * when we generate a token if we pass expired date it will expires with the specified time length if not it will be expired when the window is closed
  ```
   const token = jwt.sign({payload ...}, secret key, {expiresIn: ...})
  ```

# Redux Toolkit
## Step 1:= install redux toolkit and react redux
### `npm install @reduxjs/toolkit react-redux`
## Step 2 := creating empty redux store using configureStore API from redux toolkit and export it to use it in main file to wrap the whole components
```
 import {configureStore} from '@reduxjs/toolkit'

 export const store = configureStore({
   reducer: {}
 })

```
## Step 3 := provide the redux store to react
 ```
 import {Provider} from 'react-redux'
 import {store} from 'file where we create the store'

  <Provider store={store}>
     <App />
  </Provider>
 ```

## Step 4 := Create a redux slice using CreateSlice from redux toolkit
 ```
  import {createSlice} from "@reduxjs/toolkit";
  const initialState = {
   loading : false,
   error : null,
   user: null
  }
  const userSlice = createSlice({
   name: 'User',
   initialState,
   reducers: {
      <!-- logic -->
      signInStart : (state) =>{
         state.loading = true;
         state.error = null;
      },
      signInSuccess : (state, action) =>{
         state.loading: false,
         state.error : null,
         state.user : action.payload
      }
  }})

  export const {signInSuccess, signInStart} = userSlice.actions
  export default userSlice.reducer

<!-- we export user.reducer cause we use it in the store -->
 ```
## Step 5:= add user.reducer to the store reducer
 ```
  import userReducer from 'from the slice we created'
  const store = configureStore({
   reducer: {
      user: userReducer
   }
  })
 ```

## Step 6 := to update & use states in our component
```
 import{signInStart, signInSuccess} from 'slice we created'
 import {useDispatch} from 'react-redux'

<!-- update states by dispatching actions -->

<!-- initialize useDispatch -->
 const dispatch = useDispatch();
 
 <!-- inside our component we dispatch actions -->
 dispatch(signInStart()) // when we start signing in
 dispatch(signInSuccess(data))// we access data we pass as an argument as a payload in our slice

 <!-- To use the states -->

 <!-- we use useSelector hook from react-redux -->
 import {useSelector} from 'react-redux';

 <!-- distracture the states using the name in the slice we created-->
 const {loading, user, error} = useSelector(state=>state.user)
```
