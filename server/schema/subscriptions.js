const gql = require('graphql-tag')
const { PubSub } = require('graphql-subscriptions')
const { makeExecutableSchema } = require('graphql-tools')
const pubsub = new PubSub()

const typeDefs = gql`
	type Message {
		id: String
		username: String
		text: String
	}

	type Subscription {
		incomingMessage: Message
	}

	type Query {
		messages: [Message]
	}
`

const resolvers = {
	Subscription: {
		incomingMessage: {
			subscribe: () => pubsub.asyncIterator('incomingMessage'),
		},
	},
}

// const schema = makeExecutableSchema({ typeDefs, resolver })

exports.pubsub = pubsub
exports.schema = makeExecutableSchema({ typeDefs, resolvers })
