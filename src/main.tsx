import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";

import WeatherProvider from "./providers/WeatherProvider";
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <WeatherProvider>
            <App />
        </WeatherProvider>
    </BrowserRouter>
)
