const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rasbpcm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");
    const complainCollection = client
      .db("cityComplain")
      .collection("complains");

    // // // // // // // // // // // //

    //  *********  Complain  ********//

    // get complains

    app.get("/complains", async (req, res) => {
      const query = {};
      const cursor = complainCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // post Complains
    app.post("/complains", async (req, res) => {
      const newComplain = req.body;
      const result = await complainCollection.insertOne(newComplain);
      res.send(result);
    });

    // // // post User
    // app.post("/user", async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await userCollection.insertOne(newProduct);
    //   res.send(result);
    // });
    // get User

    // //                    Jobs
    // // get Jobs
    // app.get("/jobs", async (req, res) => {
    //   const query = {};
    //   const cursor = jobCollection.find(query);
    //   const jobs = await cursor.toArray();
    //   res.send(jobs);
    // });
    // // post Jobs
    // app.post("/jobs", async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await jobCollection.insertOne(newProduct);
    //   res.send(result);
    // });
    // // g

    // // //                        ALl services
    // // All Services Collection
    // app.post("/allServices", async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await allServicesCollection.insertOne(newProduct);
    //   res.send(result);
    // });

    // // get all services
    // app.get("/allServices", async (req, res) => {
    //   const query = {};
    //   const cursor = allServicesCollection.find(query);
    //   const mainProducts = await cursor.toArray();
    //   res.send(mainProducts);
    // });
    // // all service filter by service category
    // app.get("/allServices/:service", async (req, res) => {
    //   const service = req.params.service;
    //   const query = { service };
    //   const cursor = allServicesCollection.find(query);
    //   const user = await cursor.toArray();
    //   res.send(user);
    // });
    // // get all services by id
    // app.get("/allServicesId/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const products = await allServicesCollection.findOne(query);
    //   res.send(products);
    // });
    // // // Delete one Service
    // app.delete("/allServices/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await allServicesCollection.deleteOne(query);
    //   res.send(result);
    // });
    // // post  book services
    // app.post("/bookService", async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await bookingCollection.insertOne(newProduct);
    //   res.send(result);
    // });
    // // get Book Service
    // app.get("/bookService", async (req, res) => {
    //   const query = {};
    //   const cursor = bookingCollection.find(query);
    //   const mainProducts = await cursor.toArray();
    //   res.send(mainProducts);
    // });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running City Complain ");
});

app.listen(port, () => {
  console.log("City Complain  server is running ");
});
