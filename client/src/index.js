import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import { Switch, Route } from 'react-router-dom'

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	HttpLink,
	split,
} from '@apollo/client'

// const httpLink = new HttpLink({ uri: 'http://localhost:4001/graphql' })
const httpLink = new HttpLink({ uri: '/graphql/' })

// const wsLink = new WebSocketLink({
// 	uri: 'ws://localhost:4002/graphql',
// 	options: { reconnect: true },
// })
const host = window.location.host
const wsLink = new WebSocketLink({
	uri: `ws://${host}/graphql/`,
	options: { reconnect: true },
})
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	httpLink
)
const cache = new InMemoryCache()
const client = new ApolloClient({
	link: splitLink,
	cache,
})

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<Switch>
				<Route exact path='/' component={App} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/room' component={ChatRoom} />
			</Switch>
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
