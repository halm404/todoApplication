import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./theme.css";
import "primereact/resources/primereact.min.css";
import App from './App.jsx'
import 'primeicons/primeicons.css';
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
