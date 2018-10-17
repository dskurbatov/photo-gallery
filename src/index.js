import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import images from './images'


ReactDOM.render(<App images={images}/>, document.getElementById('app'))