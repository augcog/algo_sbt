const dbCollection = require("../db/collection")

class Operation {
	constructor(collectionName) {
		this.collectionName = collectionName
	}

	async create(document) {
		const collection = await dbCollection(this.collectionName)
		const result = await collection.insertOne(document)
		return result
	}

	async read(query = {}) {
		const collection = await dbCollection(this.collectionName)
		const documents = await collection.find(query).toArray()
		return documents
	}

	async readOne(query) {
		const collection = await dbCollection(this.collectionName)
		const document = await collection.findOne(query)
		return document
	}

	async updateOne(query, updatedDocument, opt = {}) {
		const collection = await dbCollection(this.collectionName)
		const options = {
			returnOriginal: false, // Return the updated document instead of the original one
			...opt,
		}
		const result = await collection.findOneAndUpdate(query, updatedDocument, options)

		return result
	}

	async deleteOne(query) {
		const collection = await dbCollection(this.collectionName)
		const result = await collection.deleteOne(query)
		return result
	}
}

module.exports = Operation