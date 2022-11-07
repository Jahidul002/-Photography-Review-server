const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d02hkdv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function run() {
    try {
        const dataCollection = client.db('aasignment11').collection('alldata')


        app.get('/data', async (req, res) => {
            const query = {}
            const cursor = dataCollection.find(query)
            const result = await cursor.toArray()
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