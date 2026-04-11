import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import './index.css'
import App from './App.jsx'
import WeatherProvider from "./providers/WeatherProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <WeatherProvider>
              <App />
          </WeatherProvider>
      </BrowserRouter>
  </StrictMode>,
)
