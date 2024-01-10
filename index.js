const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
// ZNwHKw9bivSsXMX9


app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://programinsaifulislam:ZNwHKw9bivSsXMX9@cluster0.5pm81pt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const CreateProjectCollaction = client.db("Task_Hub").collection("Create_Project")
const CreateTaskCollaction = client.db("Task_Hub").collection("Create_Task")
const AddTicketCollaction = client.db("Task_Hub").collection("addTicket")
const NotificationCollaction = client.db("Task_Hub").collection("notification")
const TimeCollaction = client.db("Task_Hub").collection("time")

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.post("/createProject", async (req, res) => {
      const ProjectInfo = req.body
      console.log(ProjectInfo)
      const result = await CreateProjectCollaction.insertOne(ProjectInfo)
      res.send(result)
    })
    app.get("/seeProject", async (req, res) => {
      const result = await CreateProjectCollaction.find().toArray()
      res.send(result)
    })
    app.get("/editeData/:id", async (req, res) => {
      const id = req.params.id
      const quray = { _id: new ObjectId(id) }
      const result = await CreateProjectCollaction.findOne(quray)
      res.send(result)
    })
    app.put("/updateData/:id", async (req, res) => {
      const id = req.params.id
      const body = req.body
      const quray = { _id: new ObjectId(id) }
      const update = {
        $set: {
          budget: body.budget,
          category: body.category,
          description: body.description,
          end_date: body.end_date,
          priority: body.priority,
          project_name: body.project_name,
          start_date: body.start_date
        }
      }
      const result = await CreateProjectCollaction.updateOne(quray, update)
      res.send(result)
    })
    app.delete("/deleteProjectData/:id", async (req, res) => {
      const id = req.params.id
      const quray = { _id: new ObjectId(id) }
      const result = await CreateProjectCollaction.deleteOne(quray)
      res.send(result)
    })
    app.post("/createTask", async (req, res) => {
      const body = req.body
      const result = await CreateTaskCollaction.insertOne(body)
      res.send(result)
    })
    app.get("/seeTask", async (req, res) => {
      const result = await CreateTaskCollaction.find().toArray()
      res.send(result)
    })
    app.post("/addTicket", async (req, res) => {
      const body = req.body
      const result = await AddTicketCollaction.insertOne(body)
      res.send(result)

    })
    app.get("/seeTicket", async (req, res) => {
      const result = await AddTicketCollaction.find().toArray()
      res.send(result)
    })
    app.delete("/deleteTicket/:id", async (req, res) => {
      const id = req.params.id
      const quray = { _id: new ObjectId(id) }
      const result = await AddTicketCollaction.deleteOne(quray)
      res.send(result)
    })
    app.get("/getTicket/:id", async (req, res) => {
      const id = req.params.id
      const quray = { _id: new ObjectId(id) }
      const result = await AddTicketCollaction.findOne(quray)
      res.send(result)
    })
    app.put("/updateTicket/:id", async (req, res) => {
      const id = req.params.id
      console.log(id)
      const body = req.body
      const quray = { _id: new ObjectId(id) }
      const update = {
        $set: {
          assign_name: body.assign_name,
          date: body.date,
          status: body.status,
          subject: body.subject
        }
      }
      const result = await AddTicketCollaction.updateOne(quray, update)
      res.send(result)
    })
    app.post("/notification", async(req,res)=>{
      const body = req.body
      const result = await NotificationCollaction.insertOne(body)
      res.send(result)
    })
    app.get("/notifications", async(req,res)=>{
      const result = await NotificationCollaction.find().toArray()
      res.send(result)
    })
    app.post("/Hours-Tracked", async (req,res)=>{
      const body = req.body;
      const result = await TimeCollaction.insertOne(body);
      res.send(result)
    })

    app.get("/Hours-Tracked", async (req,res)=>{
     const result = await TimeCollaction.find().toArray()
     res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("server in runing")
})
app.listen(port, () => {
  console.log(`my server in runing on port ${port}`)
})