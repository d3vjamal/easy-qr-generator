import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
