import React, { useState, useEffect } from 'react'
import MessageView from './MessageView'
import MessageForm from './MessageForm'
const ChatRoom = (props) => {
	const [user, setUser] = useState('')
	useEffect(() => {
		console.log(props.location)
		setUser(props.location.state.username)
	}, [])
	return (
		<div>
			{user ? (
				<div>
					<MessageView username={user} />
					<MessageForm username={user} />
				</div>
			) : (
				<p>Loading</p>
			)}
		</div>
	)
}

export default ChatRoom
