import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IDLExplainer from './IDLExplainer'
import Prototype from './Prototype'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IDLExplainer />} />
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
