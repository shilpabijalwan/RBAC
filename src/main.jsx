import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { getStoredUser, setCredentials } from './store/slices/authSlice'
import './index.css'
import App from './App.jsx'

const storedUser = getStoredUser()
if (storedUser) {
  store.dispatch(setCredentials({ user: storedUser }))
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
