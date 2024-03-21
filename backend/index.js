import express from 'express';
import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import cors from "cors"

const app = express();
const port = 4000;
const connectionString = 'mongodb://localhost:27017';
const database_name = "keeper";//database name
const connection = new MongoClient(connectionString);//main connection object

app.use(bodyParser.urlencoded({ extended: true }))//middle which fetches the form data like{id,title,content}
app.use(bodyParser.json());
app.use(cors())//for cross generation support

// database connection establishment
try {
    connection.connect();//making connection
    console.log('Connected successfully to Database');
}
catch (error) {
    console.log('Database unreachable');
}

//fetching all notes from the database
app.get("/get", async (req, res) => {
    try {
        const db = connection.db(database_name);
        const collection = db.collection('notes');
        let data = await collection.find({}).toArray();
        res.send(data)
        res.status(200)
    } catch (error) {
        res.status(501)
    }
})

//insertion in database 
app.post("/add", async (req, res) => {
    try {
        const userNote = req.body
        const db = connection.db(database_name);
        const collection = db.collection('notes');
        await collection.insertOne({ title: userNote.title, content: userNote.content, Bookmark: userNote.bookmark })
        res.status(200).json({ message: "Note added successfully" });//.json is nesscary so that await for returning proper promise
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: "An error occurred while adding the note" });
    }
})

//deleting particular notes from the database
app.delete("/deleteOne", async (req, res) => {
    let noteId = new ObjectId(req.body.object_id)//contain the unique object id of each individual notes

    try {
        const db = connection.db(database_name);
        const collection = db.collection('notes');
        await collection.deleteOne({ _id: noteId })
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(501).json({ message: "error while deleting something" });
    }
})
//updating particular notes from the database
app.patch("/modify", async (req, res) => {
    let tragetUpdateNote = req.body;
    let noteId = new ObjectId(tragetUpdateNote._id)
    try {
        const db = connection.db(database_name);
        const collection = db.collection('notes');
        await collection.updateOne({ _id: noteId }, { $set: { title: tragetUpdateNote.title, content: tragetUpdateNote.content, Bookmark: tragetUpdateNote.Bookmark } })
        res.status(200).json({ message: "Note updated" });
    }
    catch (err) {
        res.status(501).json({ message: "problem in updating" });
    }
})


app.listen(port, () => {
    console.log(`port is runing on ${port}`)
})