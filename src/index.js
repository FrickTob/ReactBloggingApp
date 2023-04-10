import React from "react";
import  {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './styles/bootstrap-5.3.0-alpha3-dist/css/bootstrap.min.css'

import App from './App';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>

)
