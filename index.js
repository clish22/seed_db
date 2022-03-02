import { MongoClient } from 'mongodb';
import Chance from 'chance';

// Connect to Atlas
// const client = new MongoClient(
//   'mongodb+srv://clish22:test123@cluster0.drzfo.mongodb.net/test?retryWrites=true&w=majority'
// );

// Connect to Local
const client = new MongoClient('mongodb://localhost:27017');

// Instantiate Chance so it can be used
const chance = new Chance();

// Database Name
const dbName = 'seeds';

const documentCount = 20;
const users = [];

for (let i = 0; i < documentCount; i++) {
  const user = {
    name: chance.name(),
    age: chance.age(),
    address: chance.address(),
    favouriteColor: chance.color({ format: 'hex' }),
  };
  users.push(user);
}

async function main() {
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('seed');

  const deleteAll = await collection.deleteMany({});
  console.log('Deleted all documents', deleteAll);

  const insertResult = await collection.insertMany(users);
  console.log('Inserted documents =>', insertResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
