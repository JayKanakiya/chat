import { gql } from '@apollo/client'

const getMessages = gql`
	query {
		messages {
			id
			username
			text
		}
	}
`
const addMessageMutation = gql`
	mutation($username: String, $text: String) {
		addMessage(username: $username, text: $text) {
			id
		}
	}
`

const messageSubscription = gql`
	subscription {
		incomingMessage {
			id
			username
			text
		}
	}
`
export { getMessages, addMessageMutation, messageSubscription }
