const express = require('express')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


app.use(cors({
  origin:['http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials:true
  }
))
app.use(cookieParser())
app.use(express.json())

// verify Token
const verifyToken = (req,res,next)=>{
  // jodi token na ase
  if(!req.headers.authorization){
    return res.status(401).send({message:'forbidden acess'})
  }
  // token er porer ongso pawar jonn
  const token = req.headers.authorization.split(' ')[1]
  // token na pele
  if(!token){
    return res.status(401).send({message:'forbidden acess'})
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    
    if(err){
      return res.status(401).send({message:'forbidden acess'})
    }
    req.decoded = decoded ;
    next()
  })
}


const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.hg2ad.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )

    const userCollection = client.db("BistroDB").collection("users");
    const menuCollection = client.db("BistroDB").collection("menu");
    const reviewCollection = client.db("BistroDB").collection("reviews");
    const cartCollection = client.db("BistroDB").collection("carts");

    // // Token Genarate 
    app.post('/jwt',async(req,res)=>{
      const user = req.body 
      const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2hr'})
      res.send({token})
    })
    // --------============user releted==============----------
    // ----------------check Admin---------sesh e korte hobe ,1st  e isAdmin true dor-----
    app.get('/user/admin/:email', verifyToken,async(req,res)=>{
      const email = req.params.email 
      if(email !== req.decoded.email){
        return res.status(403).send({message:'unauthorize access'})
      }
      const filter= {email: email}
      const user = await userCollection.findOne(filter)
      let admin= false 
      if(user){
        admin = user?.role === 'admin'
      }
      res.send({admin})
    })
    // ----------------end Admin-------------------------
    app.post('/user',async(req,res)=>{
      const user =req.body 
      const filter = {email: user.email}
      const existingEmail = await userCollection.findOne(filter)
      if(existingEmail){
        return res.send({message:'user.already existed'})
      }
      const result = await userCollection.insertOne(user)
      res.send(result)
    })
    // sob gula user k dekhanor jonno
    app.get('/users',verifyToken,async(req,res)=>{
      const user =req.body
      const result = await userCollection.find(user).toArray()
      res.send(result)
    })
    // user delete
    app.delete('/delete/:id',async(req,res)=>{
      const id = req.params.id 
      const filter ={_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(filter)
      res.send(result)
    })
    // user k daabase role hisabe admin banano
    app.patch('/user/admin/:id',async(req,res)=>{
      const id= req.params.id 
      const filter = {_id: new ObjectId(id)}
      const update = {
        $set:{
          role:'admin'
        }
      }
      const result = await userCollection.updateOne(filter,update)
      res.send(result)
    })
// --------------------------------------user end
    app.get('/menu',async(req,res)=>{
      const user = req.body 
      const result = await menuCollection.find(user).toArray()
      res.send(result)
    })
    app.get('/review',async(req,res)=>{
      const user = req.body 
      const result = await reviewCollection.find(user).toArray()
      res.send(result)
    })
    // add cart item 
    app.post('/cart',async(req,res)=>{
      const cartItem = req.body 
      const result = await cartCollection.insertOne(cartItem)
      res.send(result)
    })
    // get caart item 
    app.get('/cartitem',async(req,res)=>{
      const email = req.query.email
      const allCard = req.body 
      const query={email :email}
      const result = await cartCollection.find(query).toArray()
      res.send(result)
    })
    // delete cart
    app.delete('/delete/:id',async(req,res)=>{
      const id= req.params.id 
      const query = {_id: new ObjectId(id)}
      const result =await cartCollection.deleteOne(query)
      res.send(result)
    })

  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
 res.send("server is run")
})

app.listen(port, () => console.log(`Server running on port ${port}`))
