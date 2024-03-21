import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { SnackbarProvider } from 'notistack';
import { insertDb, getdb, updateDb, deleteDb } from "./DatabaseReq";
import CircularProgress from '@mui/material/CircularProgress';
function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
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

    async function addNote(newNote) {
        console.log("add note in appjs", newNote)
        await insertDb(newNote)
        setNotes((prevNotes) => {//display the new note after inserting the note into the database minimize datbase calling
            return [...prevNotes, newNote];
        });
        //mark for inspection no use of this
        let noteLists = await getdb();//this will continues after useeffect
        setNotes([...noteLists])
    }

    function deleteNote(id, object_id) {
        /*
        let data = notes.filter((noteItem, index) => {
            return index !== id;
        });*/
        //this part does not require to hit database
        //loading changing the loading state
        setLoading(true);
        //this will wait till database req has been complete after that then execute
        deleteDb(object_id).then(x => {
            let data = notes.filter((noteItem, index) => {
                return index !== id;
            });
            setNotes([...data])
            setLoading(false);
        })
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

        await updateDb(updateNote, uniqueObjId)

    }

    return (
        <div>
            <Header />
            <SnackbarProvider><CreateArea onAdd={addNote} /></SnackbarProvider>
            <SnackbarProvider maxSnack={3}>
                {
                    loading ? <CircularProgress /> : null
                }
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
                        />
                    );
                })}
            </SnackbarProvider>

            <Footer />
        </div>
    );
}

export default App;
