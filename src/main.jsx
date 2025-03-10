import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')).render(
    <RecoilRoot>
    <GoogleOAuthProvider clientId="76936609704-q6s2ba027jccad1s80juji07vneh893o.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </RecoilRoot>


)
