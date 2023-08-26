import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={client_id}>
    <ThemeProvider>
      <ToastContainer style={{zIndex:99999}} autoClose={1000} hideProgressBar={true} limit={2}/>
        <App />
    </ThemeProvider>
  </GoogleOAuthProvider>,
)
