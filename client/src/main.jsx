import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './utils/redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  // provide a persisted redux store
  <PersistGate persistor={persistor}>
    {/* Provide a store to react */}
  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
)
