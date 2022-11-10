const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());

// console.log(process.env.ACCESS_TOKEN_SECRET);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d02hkdv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function run() {
    try {
        const dataCollection = client.db('aasignment11').collection('alldata')
        const demoCollection = client.db('aasignment11').collection('demo')
        const reviewsCollection = client.db('aasignment11').collection('reviews')
        const serviceCollection = client.db('aasignment11').collection('service')

        // jwt
        app.post('/jwt', (req, res) => {
            const user = req.body
            console.log(user);
        })

        app.get('/data', async (req, res) => {
            const query = {}
            const cursor = dataCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/data/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = await dataCollection.findOne(query)
            res.send(cursor)
        })

        app.post('/reviews', async (req, res) => {
            const data = req.body
            // console.log(data);
            const result = await reviewsCollection.insertOne(data)
            res.send(result)
        })

        app.get('/reviews', async (req, res) => {
            let query = {}
            if (req.query.eventName) {
                query = {
                    eventName: req.query.eventName
                }
            }
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/review', async (req, res) => {
            // console.log(req.query.email);
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
            // console.log(result);
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await reviewsCollection.deleteOne(query)
            res.send(result)
        })

        app.get('/demo', async (req, res) => {
            const query = {}
            const cursor = demoCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/services', async (req, res) => {
            const data = req.body
            // console.log(data);
            const result = await serviceCollection.insertOne(data)
            res.send(result)
        })

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/service', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = serviceCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id
            // console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await serviceCollection.deleteOne(query)
            res.send(result)
        })


    }
    finally {

    }
}
run()


app.get('/', (req, res) => {
    res.send('Assignment server is running')
})

app.listen(port, () => {
    console.log(`Assignment server running on ${port}`);
})