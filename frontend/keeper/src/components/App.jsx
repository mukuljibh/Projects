import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { SnackbarProvider } from 'notistack';

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {//this will fetch intiall data from the api 
        async function InitialFetchNotes() {
            try {
                let intialNotes = await getdb();
                setNotes([...intialNotes]);
                console.log("found notes for the users")
            }
            catch (err) {
                console.log("Notes is empty for the user")
            }
        }
        InitialFetchNotes();
    }, [])

    async function insertdb(newNote) {
        try {
            await axios.post('http://localhost:4000/add', newNote); // Use the correct URL for inserting data
            setNotes((prevNotes) => {//inserting the new note while inserting the note into the database
                return [...prevNotes, newNote];
            });
            console.log("Inserted successfully");
        } catch (error) {
            console.error('Error inserting data:', error);
            throw error; // Optional: rethrow the error for higher-level error handling
        }
    }
    async function getdb() {
        try {
            const response = await axios.get('http://localhost:4000/get');
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Optional: rethrow the error for higher-level error handling
        }
    }
    async function updateDb(updateNote, uniqueObjId) {// This module update a particular note
        try {
            await axios.patch('http://localhost:4000/modify', {
                _id: uniqueObjId,
                title: updateNote.title,
                content: updateNote.content
            })
        }
        catch (error) {
            console.log("501")
        }

    }

    async function addNote(newNote) {
        await insertdb(newNote)
        let noteLists = await getdb();//this will continues after useeffect
        setNotes([...noteLists])

    }

    function deleteNote(id, object_id) {
        let data = notes.filter((noteItem, index) => {
            return index !== id;
        });//this part does not require to hit database
        setNotes([...data])
        try {
            axios.patch('http://localhost:4000/update', {
                object_id
            })
            console.log("Delete Success!")
        } catch (err) {
            console.log("Error while deleting")
        }
    }
    async function updateNote(updateNote, uniqueObjId, index) {
        let prevNote = notes[index];
        // this part handle the update feature of the keeper app by ensuring that problem that is arising in note.jsx in h1 and p1 tags ok now 
        //almost fix the issue but problem still left is-:
        //the success message snackbar is delayed sometime
        if (updateNote.title.length === 0 && updateNote.content.length === 0) {
            updateNote.title = prevNote.title
            updateNote.content = prevNote.content
        }
        else if (updateNote.title.length === 0) {
            updateNote.title = prevNote.title

        }
        else if (updateNote.content.length === 0) {
            updateNote.content = prevNote.content;
        }
        console.log(updateNote)
        updateDb(updateNote, uniqueObjId)

    }

    return (
        <div>

            <Header />
            <SnackbarProvider><CreateArea onAdd={addNote} /></SnackbarProvider>
            <SnackbarProvider maxSnack={3}>
                {notes.map((noteItem, index) => {
                    return (

                        <Note
                            key={index}
                            id={index}
                            object_id={noteItem._id}
                            title={noteItem.title}
                            content={noteItem.content}
                            onDelete={deleteNote}
                            onUpdate={updateNote}
                        />
                    );
                })}
            </SnackbarProvider>

            <Footer />
        </div>
    );
}

export default App;
