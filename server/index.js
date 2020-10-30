const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql')
const { schema: subscriptionSchema } = require('./schema/subscriptions')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')

const app = express()
app.use(cors())

const uri = process.env.MONGODB_URI

const serverOptions = {
	socketTimeoutMS: 30000,
	keepAlive: true,
	reconnectTries: 30000,
	useNewUrlParser: true,
}

mongoose
	.connect(uri, serverOptions)
	.then((res) => {
		console.log('mongodb connected')
	})
	.catch((err) => {
		console.error(Error, err.message)
	})

const WS_PORT = process.env.WS_PORT || 4002
const ws = createServer((req, res) => {
	res.writeHead(400), res.end()
})

ws.listen(WS_PORT, () => {
	console.log('web socket server listening')
})

const subscriptionServer = SubscriptionServer.create(
	{
		schema: subscriptionSchema,
		execute,
		subscribe,
		onConnect: () => {
			console.log('client connected')
		},
	},
	{ server: ws, path: '/graphql' }
)

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
)
const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`)
})
