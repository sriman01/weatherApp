import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyState from './components/context/myState.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <MyState>
      <App />
    </MyState>
)
