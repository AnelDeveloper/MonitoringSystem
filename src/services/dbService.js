import { MongoClient } from 'mongodb';
import { mongoUrl } from '../config/index.js'; // Make sure this path is correct

const client = new MongoClient(mongoUrl);

export async function insertChangeLog(change) {
    try {
        await client.connect();
        const db = client.db("websiteChanges");
        const collection = db.collection("changeLogs");
        await collection.insertOne(change);
    } finally {
        await client.close();
    }
}

