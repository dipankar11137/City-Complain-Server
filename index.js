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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evn2ej1.mongodb.net/?retryWrites=true&w=majority`;
// const uri =
//   'mongodb+srv://city_complain:b5U6JlZynigGFBAK@cluster0.wly1h4d.mongodb.net/?retryWrites=true&w=majority';

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
      .db('cityComplain')
      .collection('complains');
    const userCollection = client.db('cityComplain').collection('user');
    const reviewCollection = client.db('cityComplain').collection('review');

    // // // // // // // // // // // //

    //  *********  User  ********//

    // create and update User
    //create and update a user
    app.put('/create-user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    //get all users from db
    app.get('/users', async (req, res) => {
      const query = {};

      const cursor = userCollection.find(query);
      const users = await cursor.toArray();

      res.send(users);
    });

    // all User filter by email category
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    //  *********  Complain  ********//

    // get complains

    app.get('/complains', async (req, res) => {
      const query = {};
      const cursor = complainCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // post Complains
    app.post('/complains', async (req, res) => {
      const newComplain = req.body;
      const result = await complainCollection.insertOne(newComplain);
      res.send(result);
    });

    // // Delete one complain
    app.delete('/complains/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await complainCollection.deleteOne(query);
      res.send(result);
    });

    //  Complain filter by email
    app.get('/complains/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = complainCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
    //  Complain filter by Division
    app.get('/complain/:division', async (req, res) => {
      const division = req.params.division;
      const query = { division };
      const cursor = complainCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //  Complain filter by district
    app.get('/complainDistrict/:district', async (req, res) => {
      const district = req.params.district;
      const query = { district };
      const cursor = complainCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //  Complain filter by date
    app.get('/complainDate/:date', async (req, res) => {
      const date = req.params.date;
      const query = { date };
      const cursor = complainCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // post review
    app.post('/review', async (req, res) => {
      const newComplain = req.body;
      const result = await reviewCollection.insertOne(newComplain);
      res.send(result);
    });
    //  Review filter by email
    app.get('/review/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = reviewCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
    // update process
    app.put('/processing/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          processing: updatePayment.processing,
        },
      };
      const result = await complainCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    app.put('/done/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          done: updatePayment.done,
        },
      };
      const result = await complainCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
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
