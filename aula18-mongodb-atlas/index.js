const MongoClient = require('mongodb').MongoClient;

const uri =
  'mongodb+srv://mongouser:<password>@bootcamp-smurc.mongo.net/<dbname>?retryWrites=true&W=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   //perform actions on the collection object
//   client.close();
// });

client.connect(async (err) => {
  //obter collection student
  const collection = client.db('grades').collection('student');

  //busca documents cujo suject seja Historia
  const documents = await collection.find({ subject: 'Historia' }).toArray();
  //console.log(documents);

  //obter lista dos bancos no servidor conectado
  const database = await client.db().admin().listDatabases();
  console.log('Databases');

  databaselist.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
  client.close();
});
