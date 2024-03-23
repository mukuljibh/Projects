import express from 'express';
import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import cors from "cors";

const app = express();
const port = 4000;
const connectionString = 'mongodb://localhost:27017';
const DATABASE_NAME = "IdeaVault"; // database name
const connection = new MongoClient(connectionString); // main connection object

app.use(bodyParser.urlencoded({ extended: true })); // middleware which fetches the form data like { id, title, content }
app.use(bodyParser.json());
app.use(cors()); // for cross-generation support

// Database connection establishment
try {
    connection.connect(); // making connection
    console.log('Connected successfully to Database');
} catch (error) {
    console.log('Database unreachable');
}

// Fetching all notes from the database
app.get("/get", async (req, res) => {
    try {
        const collection_name = req.query.coll;
        const db = connection.db(DATABASE_NAME);
        const collection = db.collection(collection_name);
        let data = await collection.find({}).toArray();
        res.send(data);
        res.status(200);
    } catch (error) {
        res.status(501);
    }
});

// Insertion in database 
app.post("/add", async (req, res) => {
    try {
        const userNote = req.body.newNote;
        const collection_name = req.body.coll;
        const db = connection.db(DATABASE_NAME);
        const collection = db.collection(collection_name);
        await collection.insertOne({ title: userNote.title, content: userNote.content, Bookmark: userNote.bookmark });
        res.status(200).json({ message: "Note added successfully" }); // .json is necessary so that await returns a proper promise
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: "An error occurred while adding the note" });
    }
});

// Deleting particular notes from the database
app.delete("/deleteOne", async (req, res) => {
    let noteId = new ObjectId(req.body.object_id); // contain the unique object id of each individual note
    try {
        const db = connection.db(DATABASE_NAME);
        const collection_name = req.body.coll;
        const collection = db.collection(collection_name);
        await collection.deleteOne({ _id: noteId });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(501).json({ message: "error while deleting something" });
    }
});

// Updating particular notes from the database
app.patch("/modify", async (req, res) => {
    let targetUpdateNote = req.body;
    let noteId = new ObjectId(targetUpdateNote._id);
    try {
        const db = connection.db(DATABASE_NAME);
        const collection_name = targetUpdateNote.coll;
        const collection = db.collection(collection_name);
        await collection.updateOne({ _id: noteId }, { $set: { title: targetUpdateNote.title, content: targetUpdateNote.content, Bookmark: targetUpdateNote.Bookmark } });
        res.status(200).json({ message: "Note updated" });
    } catch (err) {
        res.status(501).json({ message: "problem in updating" });
    }
});

// User authentication and authorization routes
app.post("/register", async (req, res) => {
    const user = req.body;
    try {
        const db = connection.db(DATABASE_NAME);
        const collection = db.collection('UserDetail');
        await collection.insertOne({ Username: user.Username, Password: user.Password });
        res.status(201).json({ flag: true, msg: "successfully inserted" });
    } catch (err) {
        res.status(501).json({ flag: false, msg: "Username already exists" });
    }
});

app.post("/auth", async (req, res) => {
    const user = req.body;
    try {
        const db = connection.db(DATABASE_NAME);
        const collection = db.collection('UserDetail');

        let data = await collection.findOne({ Username: user.Username, Password: user.Password });
        data ? res.status(201).json({ success: true, msg: "found user" }) : res.status(201).json({ success: false, msg: "not user found " });
    } catch (err) {
        res.status(501).json({ msg: "something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`port is running on ${port}`);
});
