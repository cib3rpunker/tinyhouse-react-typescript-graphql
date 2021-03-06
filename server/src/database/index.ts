import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db('main');

  return {
    listings: db.collection("test_listings")
  };
};

//const uri = "mongodb+srv://viktor_oolen:<password>@horrorcluster.gt0ea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// const client = new MongoClient(url);
// client.connect(err => {
//   const collection = client.db("test").collection("devices");

//   // perform actions on the collection object

//   client.close();
// });
