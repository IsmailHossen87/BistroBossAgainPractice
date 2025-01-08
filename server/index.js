const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
  }
))
app.use(cookieParser())
app.use(express.json())
const verifyToken = (req,res,next)=>{
  const token = req?.cookies?.Token
  if(!token){
    return res.status(401).send({message:'UnAuthorize'})
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err){
      return res.status(401).send({message:'UnAuthorize'})
    }
    console.log(decoded)
    req.user= decoded
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

    // Token Genarate 
    app.post('/jote',async(req,res)=>{
      const user = req.body
      const token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'5s'})
      res
      .cookie('Token',token,{
        httpOnly:true,
        secure:false
      } )
      .send({sucess:true})
    })

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

  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
 res.send("server is run")
})

app.listen(port, () => console.log(`Server running on port ${port}`))
