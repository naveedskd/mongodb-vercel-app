const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://naveedsk:Nad12345$$@exceldata.vftbtpd.mongodb.net/?retryWrites=true&w=majority&appName=ExcelData";
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("exceldb");
    const collection = db.collection("exceldta");

    if (req.method === "GET") {
      const records = await collection.find().toArray();
      res.status(200).json(records);
    } else if (req.method === "POST") {
      const data = req.body;
      const result = await collection.insertOne(data);
      res.status(201).json(result);
    } else if (req.method === "PUT") {
      const id = req.query.id;
      const data = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      res.status(200).json(result);
    } else if (req.method === "DELETE") {
      const id = req.query.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } else {
      res.status(405).send("Method Not Allowed");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
};
