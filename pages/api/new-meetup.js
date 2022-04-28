// POST /api/new-meetup
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
		console.log(data);
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Lakshya:Lakshya%40123@cluster0.pxdli.mongodb.net/next-js?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);
      console.log(result);

      client.close();

      res.status(201).json({
        data: result,
        message: "Meetup inserted",
      });
    } catch (e) {
      console.log(e);
    }
  }
}
