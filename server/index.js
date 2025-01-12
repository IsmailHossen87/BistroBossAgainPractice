require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// // PAYMETN
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    // origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.hg2ad.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const userCollection = client.db("BistroDB").collection("users");
    const menuCollection = client.db("BistroDB").collection("menu");
    const reviewCollection = client.db("BistroDB").collection("reviews");
    const cartCollection = client.db("BistroDB").collection("carts");
    const paymentCollection = client.db("BistroDB").collection("payment");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2hr",
      });
      res.send({ token });
    });
    // verify Token
    const verifyToken = (req, res, next) => {
      // jodi token na ase
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "forbidden acess" });
      }

      // token er porer ongso pawar jonn
      const token = req.headers.authorization.split(" ")[1];
      // token na pele
      if (!token) {
        return res.status(401).send({ message: "unAuthorize acess" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unAuthorize acess" });
        }
        req.decoded = decoded;
        next();
      });
    };
    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // --------============user releted==============----------
    // ----------------check Admin---------sesh e korte hobe ,1st  e isAdmin true dor---

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const user = req.body;
      const result = await userCollection.find(user).toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorize access" });
      }
      const filter = { email: email };
      const user = await userCollection.findOne(filter);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });
    // ----------------end Admin-------------------------

    // ekta user bar bar jeno login na korte pare
    app.post("/user", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const existingEmail = await userCollection.findOne(filter);
      if (existingEmail) {
        return res.send({ message: "user.already existed" });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // user delete
    app.delete("/userDelete/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(filter);
      res.send(result);
    });
    // user k daabase role hisabe admin banano
    app.patch("/user/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, update);
      res.send(result);
    });
    // --------------------------------------user end
    app.post('/menu',verifyToken,verifyAdmin,async(req,res)=>{
      const data = req.body 
      const result = await menuCollection.insertOne(data)
      res.send(result)
    })
    app.get("/menu", async (req, res) => {
      const user = req.body;
      const result = await menuCollection.find(user).toArray();
      res.send(result);
    });
    app.delete('/menu_delete/:id',async(req,res)=>{
      const id = req.params.id 
      const filter = {_id: new ObjectId(id)}
      const result = await menuCollection.deleteOne(filter)
      res.send(result)
    })
    // update korar jonno ekta ke search 
    app.get('/menufind/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id: new ObjectId(id)}
      const result  = await menuCollection.findOne(query)
      res.send(result)
    })
    // update menu
    app.patch('/menuUpdate/:id',async(req,res)=>{
      const item = req.body 
      const id= req.params.id 
      const filter ={_id: new ObjectId(id)}
      const update ={
        $set:{
          name: item.name ,
          category: item.category,
          image:item.image ,
          recipe:item.recipe,
          price:item.price
        }
      }
      const result = await menuCollection.updateOne(filter,update)
      res.send(result)
    })

    app.get("/review", async (req, res) => {
      const user = req.body;
      const result = await reviewCollection.find(user).toArray();
      res.send(result);
    });
    // add cart item
    app.post("/cart", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });
    // get caart item
    app.get("/cartitem", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    // delete cart
    app.delete("/delete/:id",verifyToken, async (req, res) => {
      
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });


    // payment releted
    app.post('/create-payment-intent',async(req,res)=>{
      const {price}= req.body 
      const amount = parseInt(price * 100)
      const paymentIntent = await stripe?.paymentIntents.create({
        amount:amount ,
        currency:'usd',
        payment_method_types:['card']
      })
      res.send({clientSecret:paymentIntent?.client_secret})
    })
    // payment korle sob store kore rakhar jonno
    app.post('/payment',async(req,res)=>{
      const payment= req.body 
      const paymentResult = await paymentCollection.insertOne(payment)
      // carefully  delete item in the card
      const query ={_id:{
        $in:payment.cardId?.map(id => new ObjectId(id))
      }}
      const deleteResult = await cartCollection.deleteMany(query)
      res.send({paymentResult,deleteResult})
    })
    // paymet history show
    app.get('/paymentHistory/:email',verifyToken,async(req,res)=>{ 
      const email = req.params.email 
      const query = {user: email}
      if(email !== req.decoded.email){
        return res.status(403).send({message:'forbidden access'})
      }
      const result = await paymentCollection.find(query).toArray()
      res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is run");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
