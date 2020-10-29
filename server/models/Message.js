const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
	username: String,
	text: String,
})

module.exports = mongoose.model('Message', messageSchema)
