import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'
import ContextProvider from './context/ContextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
    <ContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </ContextProvider>
    </BrowserRouter>
  </>,
)
