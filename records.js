const { MongoClient } = require('mongodb');

const uri = "YOUR_MONGODB_ATLAS_URI";
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("records");

    if (req.method === "GET") {
      const records = await collection.find().toArray();
      res.status(200).json(records);
    } else if (req.method === "POST") {
      const data = req.body;
      const result = await collection.insertOne(data);
      res.status(201).json(result);
    } else {
      res.status(405).send("Method Not Allowed");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
};
