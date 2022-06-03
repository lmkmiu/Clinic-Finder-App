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

    try {
        await client.connect();
        const db = client.db("Clinic")
        await db.collection("business").insertMany(business);

        // res.status(201).json({  status: 201, 
        //                         message: "done" })
    } catch (err) {
        // res.status(400).json({  status: 400, 
        //                         message: err.message });
    }
    
    client.close();
    console.log("disconnected!");
}

    batchImport()