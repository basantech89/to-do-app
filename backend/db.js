const MongoClient = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017/';
const DB_NAME = 'to-do';
let connectionInstance;

const getDbClient = async () => {
  if (!connectionInstance) {
    connectionInstance = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
  }
  return connectionInstance;
};

const getDb = async () => {
  await getDbClient();
  if (!connectionInstance) {
    throw new Error('Db not connected');
  }

  return connectionInstance.db(DB_NAME);
};

module.exports = {
  getDbClient,
  getDb,
};
