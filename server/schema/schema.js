const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
} = require('graphql')
const Message = require('../models/Message')
const { pubsub } = require('./subscriptions')

const MessageType = new GraphQLObjectType({
	name: 'Message',
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		text: { type: GraphQLString },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		messages: {
			type: GraphQLList(MessageType),
			resolve(parent, args) {
				return Message.find({})
			},
		},
	},
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addMessage: {
			type: MessageType,
			args: {
				username: { type: GraphQLString },
				text: { type: GraphQLString },
			},

			resolve(parent, args) {
				let message = new Message({
					username: args.username,
					text: args.text,
				})
				pubsub.publish('incomingMessage', { incomingMessage: message })
				return message.save()
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
