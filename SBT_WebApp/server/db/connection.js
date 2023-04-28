const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

const mongo_uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

async function connectToDb() {
	try {
		const client = new MongoClient(mongo_uri);
		await client.connect();
		db = client.db(dbName);
		return db;
	} catch (err) {
		console.error(err);
	}
}

async function getDb() {
	if (!db) {
		db = await connectToDb();
	}
	return db;
}

module.exports = { connectToDb, getDb };