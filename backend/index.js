const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jwt  = require('jsonwebtoken');

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.qlgqduo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //await client.connect();

    const roommateCollection = client.db('roommateDB').collection('roommates');


    app.get('/roommates', async (req, res) => {
      const result = await roommateCollection.find().toArray();
      res.send(result);
    });

    
    app.post('/roommates', async (req, res) => {
      const newRoommate = req.body;
      console.log(newRoommate);
      const result = await roommateCollection.insertOne(newRoommate);
      res.send(result);
    });

   
    app.get('/featured-roommates', async (req, res) => {
      const result = await roommateCollection
        .find({ availability: 'Available' })  
        .limit(6)                              
        .toArray();
      res.send(result);
    });

        // 🚀 Dashboard Overview API
    app.get('/dashboard-overview', async (req, res) => {
      const userEmail = req.query.email;

      const totalRoommates = await roommateCollection.estimatedDocumentCount();

      const availableRoommates = await roommateCollection.countDocuments({
        availability: 'Available',
      });

      let myListingsCount = 0;
      if (userEmail) {
        myListingsCount = await roommateCollection.countDocuments({
          email: { $regex: new RegExp(`^${userEmail}$`, 'i') },
        });
      }

      const recentRoommates = await roommateCollection
        .find()
        .sort({ _id: -1 })
        .limit(3)
        .toArray();

      const recentActivity = recentRoommates.map((roommate) => {
        return `New roommate added: ${roommate.email || 'No Email Found'} in ${roommate.location || 'Unknown Location'}`;
      });

      res.send({
        totalRoommates,
        availableRoommates,
        myListingsCount,
        recentActivity,
        accountStatus: 'Active',
      });
    });


    app.put('/roommates/:id', async (req,res)=>{
      const id= req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true};
      const updatedRoommate = req.body;
      const updatedDoc ={
        $set: updatedRoommate
      };
      const result = await roommateCollection.updateOne(filter,updatedDoc);
      res.send(result);
    })


    app.delete('/roommates/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await roommateCollection.deleteOne(query);
      res.send(result);
    })

    
    app.get('/roommates/:id', async (req, res) => {
      const id = req.params.id;
      const result = await roommateCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Ping
    //await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");

  } finally {
    // await client.close(); 
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Server is running!!!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});