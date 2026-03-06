import React from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from './Portfolio.jsx'
import './index.css'

console.log('Portfolio mounting...');
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>,
)
