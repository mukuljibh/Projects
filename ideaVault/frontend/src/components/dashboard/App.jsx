import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { SnackbarProvider } from 'notistack';
import { insertDb, getdb, updateDb, deleteDb } from "./DatabaseReq";
import { useLocation } from "react-router-dom";

function App() {
    const [notes, setNotes] = useState([]);
    let location = useLocation();
    const collection_name = location.state
    useEffect(() => {//this will fetch intiall data from the api 
        async function intialFetchNotes() {
            try {
                let intialNotes = await getdb(collection_name);
                setNotes([...intialNotes]);
                console.log("found notes for the users")

            }
            catch (err) {
                console.log("Notes is empty for the user")

            }
        }
        intialFetchNotes();

    }, [collection_name])

    async function addNote(newNote) {
        console.log("add note in appjs", newNote)
        await insertDb(newNote, collection_name)
        setNotes((prevNotes) => {//display the new note after inserting the note into the database minimize datbase calling
            return [...prevNotes, newNote];
        });
        //mark for inspection no use of this
        let noteLists = await getdb(collection_name);//this will continues after useeffect
        setNotes([...noteLists])
    }


    async function deleteNote(id, object_id) {
        //this will wait till database req has been complete after that then execute
        await deleteDb(object_id, collection_name)
        let data = notes.filter((noteItem, index) => {
            return index !== id;
        });
        setNotes([...data])


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

        await updateDb(updateNote, uniqueObjId, collection_name)

    }

    return (
        <div>
            <Header username={collection_name} />
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
                            Bookmark={noteItem.Bookmark}
                            onDelete={deleteNote}
                            onUpdate={updateNote}
                            coll={collection_name}
                        />
                    );
                })}
            </SnackbarProvider>

            <Footer />
        </div>
    );
}

export default App;
