import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";

import WeatherProvider from "./providers/WeatherProvider.tsx";
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <WeatherProvider>
            <App />
        </WeatherProvider>
    </BrowserRouter>
)
