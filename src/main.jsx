import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { getStoredToken, setCredentials } from './store/slices/authSlice'
import './index.css'
import App from './App.jsx'

const token = getStoredToken()
if (token) {
  store.dispatch(setCredentials({ token }))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
