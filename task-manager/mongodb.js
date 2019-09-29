const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName  = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        name: 'Gertrude',
        age: 28
    }, (error, result) => {
        if (error) return console.log('Error insterting one document');
        console.log(result.ops);
    });


    db.collection('users').insertMany([
        {name: 'Gaitano', age: 25}, {name: 'Cynthia', age: 30}
    ], (error, result) => {
        if (error) return console.log('Error inserting many documents');
        console.log(result.ops)
    })
});


