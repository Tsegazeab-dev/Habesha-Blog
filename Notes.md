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

 <!-- To extract and use the states from the redux store-->

 <!-- we use useSelector hook from react-redux -->
 import {useSelector} from 'react-redux';

 <!-- distracture the states using the name in the slice we created-->
 const {loading, user, error} = useSelector(state=>state.user)

// useSelector(state => state.user) essentially selects the user slice of the Redux store state

<!-- if we are using a persisted reducer in the store and we want to extract the states from the store-->
const {loading, user, error} = useSelector(state=>state.persistedReducer.user)
```

# How we can solve the state loss during refresh using redux toolkit?
 ## Redux Persist
 ### Rehydrating the redux store using redux persist
 #### Step 1 := combine multiple reducers in the store into a single reducer function using  `combineReducers` from redux toolkit
  ```
  import {combineReducer} from '@reduxjs/toolkit'
   const rootReducer = combineReducers({
    user: userReducer,
    other reducers ...
    });

  ```
 #### Step 2 := create a configuration object that defines how the Redux state should be persisted.
  ```
  import storage from 'redux-persist/lib/storage'
  const persistConfig = {
    key : "root",
    storage,
    version: 1
  };

 ```

#### Step 3 := create a persisted reducer using `persistReducer` function from redux-persist. the function returns a new reducer that automatically persists the Redux state
 * `const persistedReducer = persistReducer(persistConfig, rootReducer);`

#### Step 4 := store creation using persisted reducer and middleware to allow non sterializable datas store in redux store so we can avoid any errors and warnings of redux toolkit
 ```
  export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
 ```
 * middleware := key allows you to customize the middleware applied to the Redux store
 * middleware is a function that takes getDefaultMiddleware as a parameter.
 * getDefaultMiddleware() returns an array of middleware provided by Redux Toolkit
 * { serializableCheck: false } is passed to getDefaultMiddleware(), which disables Redux Toolkit's built-in serializable state checking
 * setting serializableCheck to false, it allows non-serializable data to be stored in the Redux store without triggering warning messages during development.

#### Step 5 := create a persistor object using persistStore function from  redux-persist responsible for persisting and rehydrating the Redux store with the saved state data from the storage.
 * `export const persistor = persistStore(store);`

#### Step 6 := Finally wrap the whole component with persistGate from redux persist  and provide the persistor to it. PersistGate component delays rendering until the persisted state has been retrieved and saved to the Redux store.
 ```
 import { persistor} from 'store we configured above'
 import { PersistGate } from 'redux-persist/integration/react'

  <PersistGate persistor={persistor}>
    {/* Provide a store to react */}
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>

 ```


# Sign in with Google
 * ## Step 1 := Set up Firebase
   * ###  create project on Firebase console 
   * ###  add app and generate config file for web
   * ### install firebase in the frontend
   * ### copy the firebase config and use it in a file firebase.js and export the        initialized app
   * ### Back to the firebase console and enable authentication with Google

 * ## Step 2 := Build the frontend functionality
   * ### create a button and when it is clicked write response function for the event
     * #### Step 1 := create a new instance of the GoogleAuthProvider class, which is provided by Firebase. This provider allows users to sign in using their Google accounts
       * `import {GoogleAuthProvider} from 'firebase/auth'`
       * ` const provider = new GoogleAuthProvider()`
     * #### Step 2 := set the prompt parameter  to "select_account", which means that when the user is prompted to sign in with Google, they will always be prompted to select an account, even if they are already signed in with Google.
       * `provider.setCustomParameters({ prompt: "select_account" })`
     * #### Step 3 := initializes authentication using a provided Firebase app instance.
       * `import {getAuth} from 'firebase/auth'`
       * `const auth = getAuth(app)`
       * app is the instance created by using our firebase configuration in firebase.js
     * #### Step 4 := initiate the sign-in process using a popup window with the Google authentication provider
       * `const result = await signInWithPopup(auth, provider)`
       * we find the user information in `result.user`
     * #### Step 5 := send a post request using the user information as a body
        ```
         fetch('/api/auth/google', {
           method : "Post",
           headers:{'Content-Type': 'application/json'}
           body : JSON.stringfy(
           {
            username: result.user.displayname
            email: result.user.email
            profilePicture: result.user.PhotoUrl
           })
         })
       ```
    * #### Step 6 := depending on the result from the backend navigate to the home page   
* ## Step 3 := build the backend routes
  * ### create a route and write the request handler inside the controller file
    * #### check if the email exist in the database
    * #### if it exists generate a token and send the user data retrieved from the DB except the password to the frontend
    * #### if the email not exist in the DB
    * #### generate a unique username by adding some random characters to the username
      * `const username  = username + Math.random().toString(36).slice(-4)`
    * #### generate a password since the user is signed up using Google Auth and inserting password is a required in the database schema
      * `const generatedPassword  = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)`
    * #### hash the password using bcrypt and save the whole user data in the DB
    * #### generate a token and send the userData except the password to the frontend
    


## To update the header component if the user logged in we show user's profile if not we display "sign in" button. 
 ### if there is a user data in the redux store user state that means the user is logged in so we show the profile picture. if the user state is null means no one is logged in we show a sign in button
 ### we use flowbite react for the UI
  * `<Avatar/>` for the profile picture
  * `<DropDown/>` to build drop down menu below the profile with options to navigate to profile page or sign out
   * `<DropDown.Header/>`
   * `<DropDown.Item>`
   * `<DropDown.Divider>`

# Change Theme functionality Dark to light light to dark
 ## Functionality := when the button is clicked the state changes and depends on the state change the background color will be changed
  ### create a slice with an initial state of theme state "dark" and reducer called toggleTheme which changes if the theme was dark to light and viceversal when it is dispatched.
  ### the toggleTheme reducer function is dispatched when the button in the header component clicked.
  ### we need a provider component that wrap the whole component and give styles based on the state theme.
  ### we show the button icons in the header component conditionally if it is dark a sun and if it light a moon

 ## Remark := we don't have to return value or use an arrow function with out curly braces inside reducer function of redux toolkit.

 ## Remark:= by default the class name `dark:bg-gray-800` checks the os theme mode if it is dark the propery will be applied. so by default `dark` represent the os mode. but if we want to change the theme mode using class name `dark` we must add `darkMode: "class"` to the tailwind.config. then when we give a class name `dark` the property `dark:bg-gray-800` will be applied.

 ## If we want our application take the system prefence mode when it run for the first time and we want to change it using the buttons whenever we want
  ### step 1 := we must check the system preference mode first
   * `window.matchMedia("(prefers-color-scheme: dark)").matches` this line checks if the system preference is set to dark or not. if it is dark it will be true and if not it will be false.
   * so based on the result we can change the redux state by dispatching a reducer that set the passed argument as theme state value.
   ```
    useEffect(()=>{
      if(window.matchMedia("(prefers-color-scheme: dark)").matches){
        dispatch(setSystemTheme("dark"))
      }
      else{
        dispatch(setSystemTheme("light"))
      }
    },[])
   ```
   * we write action in the slice reducer
   ```
    reducers:{
      setSystemTheme : (state, action)=>{
        state.theme = action.payload
      }
    }
   ```

# Build a Private Routes
 ## Step 1 := create a component that wraps all private routes
 ## step 2 := the component checks the authentication if the user is logged in it renders the child component and if not it will redirect to the sign in page


## Tips := URLSearchParams is an interface provided by the JavaScript URL API for working with the query string of a URL. It allows you to manipulate query parameters easily.
 ### By using useLocation() hook that can help us to get the current page url and query parameters and use the result in URLSearchParams object we can use and manipulate the query string.
 ```
  import {useLocation} from 'react-router-dom'

  const location = useLocation()

  const query = new URLSearchParams(location.search)

  <!-- location.search gives us the query string or the url string beside the main path -->

  query.get("key") => we can access the value of the query and we can use it to decide what content should be rendered in the page
 ```


## Image upload functionality
### Step 1 := prepare file type input that accepts images so onchange  event can be triggered when user selects an image so we can save the choosen file in a state.
```
 <input type:"file" accept="image/*" onChange={handleFileChange} />

// prepare state to store the choosen file
const [selectedFile, setSelectedFile] = useState(null)

 const handleFileChange = (e)=>{
  setSelectedFile(e.target.files[0])
 }
```
### TIP := we can generate a link using the selected file but it only works on our machine. to get a link that works for every machine and save it to the database we can use firebase storage.
 `const imageLink = URL.createObjectURL(e.target.files[0])`

### Step 2 := Go to firebase console and use storage  bucket for images. we rewrite rules for the images only to upload less than 2MB and only accept images.
```
 rules_version = '2';

 // Craft rules based on data in your Firestore database
 // allow write: if firestore.get(
 //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
 service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') 
    }
  }
 }
```
### Step 3 := write uploadImage function that uploads the user chosen image to the firebase storage. tracks the uploading progress, if there is an uploading error, and also get downloadUrl to save it to the db.
```
<!-- the uploadImage function invoked iff the user choose some image to change -->
    const uploadImage = async ()=>{

      // Get Storage Reference: This retrieves a reference to the Cloud Storage service.
      `const storage = getStorage(app);`

      //Generate Unique Filename: This generates a unique filename based on the current timestamp concatenated with the original filename.
      `const fileName = new Date().getTime() + imageFile.name;`

      // Create Storage Reference: This creates a reference to the location in the Cloud Storage where the file will be stored.
      `const storageRef = ref(storage, fileName);`

      // Upload File: This initiates the upload of the file to the Cloud Storage. uploadBytesResumable is a method that starts uploading the file data specified by imageFile to the location specified by storageRef.
      `const uploadTask = uploadBytesResumable(storageRef, imageFile);`

      // Track Upload Progress: This sets up an event listener to track the upload progress. Whenever the state of the upload changes, this function calculates the progress as a percentage and updates the upload progress.
      `uploadTask.on('state_changed', (snapshot) => {
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setImageUploadProgress(progress.toFixed(0));
       }),`

       // Handle Upload Error: If an error occurs during the upload process, this function is called to set an error message indicating that the file must be an image and less than 2MB.
       `(error) => {
            setImageFileUploadError("File must be an image and less than 2MB");
         },`

      // Upload Completion: Once the upload is completed successfully, this function retrieves the download URL of the uploaded file using getDownloadURL and sets it as the image file URL.
       `() => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
          });
         }`
    }
```
#### Step 4 := show the progress or the error in the user interface and also save url of the image to the databse  by updating the previous profile picture.
 * for the progress bar we use  `npm i react-circular-progressbar`

## Update user data
### Prepare the update API route
