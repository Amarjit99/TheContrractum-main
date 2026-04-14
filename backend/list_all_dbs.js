const { MongoClient } = require('mongodb');
require('dotenv').config();

async function listDbs() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const dbs = await client.db().admin().listDatabases();
    console.log('Databases:', dbs.databases.map(d => d.name));
    for (const dbInfo of dbs.databases) {
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      console.log(`Database: ${dbInfo.name}, Collections:`, collections.map(c => c.name));
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

listDbs();
