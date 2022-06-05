const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const business = require("./data.js/business.json")

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
};

const batchImport = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

        await client.connect();
        const db = client.db("Clinic")
        await db.collection("business").insertMany(business);

    client.close();
    console.log("disconnected!");
}

    batchImport()