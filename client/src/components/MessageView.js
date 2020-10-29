import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { getMessages, messageSubscription } from '../graphql/queries'

const MessageView = ({ username }) => {
	const f = useQuery(getMessages)
	const data = f.data
	const loading = f.loading
	const subscribeToMore = f.subscribeToMore

	useEffect(() => {
		console.log('gr')
		subscribeToMore({
			document: messageSubscription,
			updateQuery: (prev, { subscriptionData }) => {
				console.log('jfh')
				if (!subscriptionData) return prev
				console.log(subscriptionData)
				const newMessage = subscriptionData.data.incomingMessage
				const updatedMessageList = Object.assign({}, prev, {
					messages: [...prev.messages, newMessage],
				})
				console.log(updatedMessageList)
				return updatedMessageList
			},
		})
	}, [])

	if (!loading && data) {
		var displayMessages = data.messages.map((m) => {
			const type = m.username == username ? 'outgoing' : 'incoming'
			return (
				<div className={`message ${type}`}>
					{type === 'incoming' ? <p className='name'>{m.username}</p> : null}
					<div className='message-text'>
						<p>{m.text}</p>
					</div>
				</div>
			)
		})
	}

	return (
		<div>
			{!loading ? (
				<div className='message-list'>{displayMessages}</div>
			) : (
				<div></div>
			)}
		</div>
	)
}

export default MessageView
