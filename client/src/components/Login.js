import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Login = (props) => {
	const [username, setUsername] = useState('')
	const [redirect, setRedirect] = useState(false)

	const handleChange = (e) => {
		e.preventDefault()
		setUsername(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// localStorage.setItem('username', username)
		// props.history.push({
		// 	pathname: '/room',
		// 	username,
		// })
		setRedirect(true)
	}

	return (
		<div className='login'>
			<form id='login-form' onSubmit={handleSubmit}>
				<div>
					<label>Username</label>
					<input type='text' name='username' onChange={handleChange} />
				</div>
				<button>Enter</button>
			</form>

			{redirect ? (
				<Redirect
					to={{
						pathname: '/room',
						state: { username: username },
					}}
				/>
			) : (
				<div></div>
			)}
		</div>
	)
}

export default Login
