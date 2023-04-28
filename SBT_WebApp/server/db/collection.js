const { getDb } = require('./connection');

const collection = async (collectionName) => {
  const db = await getDb()
  const dbCollection = await db.collection(collectionName);
  return dbCollection;
}

module.exports = collection