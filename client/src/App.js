import React from 'react'
import './App.css'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'

import { Switch, Route } from 'react-router-dom'

const App = () => {
	return (
		<div className='App'>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/room' component={ChatRoom} />
			</Switch>
		</div>
	)
}

export default App
