import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { addMessageMutation } from '../graphql/queries'

const MessageForm = ({ username }) => {
	const [message, setMessage] = useState('')
	const [addMessage] = useMutation(addMessageMutation)

	const handleChange = (e) => {
		setMessage(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (message) {
			addMessage({ variables: { username, text: message } })
		}
		console.log(username, message)
		setMessage('')
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						name='message'
						onChange={handleChange}
						value={message}
					/>
					<button type='submit'>Send</button>
				</div>
			</form>
		</div>
	)
}

export default MessageForm
