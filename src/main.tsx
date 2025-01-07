import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9100/api/';
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
