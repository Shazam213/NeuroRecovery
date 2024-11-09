import { createRoot } from 'react-dom/client'
import './index.css'
import {ThemeProviders} from './contexts/ThemeContext' 
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <ThemeProviders>
    <App />
  </ThemeProviders>,
)
