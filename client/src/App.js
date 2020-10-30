import React from 'react'
import './App.css'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import Chat from './assets/Chat.png'

import { Switch, Route, Link } from 'react-router-dom'

const App = () => {
	return (
		<div className='App'>
			<img src={Chat} alt='Chat' className='responsive' />
			<Link to='/login'>
				<button className='enter'>Login</button>
			</Link>
		</div>
	)
}

export default App
