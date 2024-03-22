import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Fab from "@material-ui/core/Fab";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Bookmark from "@mui/icons-material/Bookmark";
import { updateDb } from "./DatabaseReq";
import Message from "./Message";
import { useSnackbar } from 'notistack';


function Note(props) {

    const [eventUpdateHandle, seteventUpdateHandle] = useState({ title: "", content: "", Bookmark: false });
    const [mark, setmark] = useState(false);//set state asynch does not reflect immediate changes that why 
    const { enqueueSnackbar } = useSnackbar();
    //for fetching the particular note by using dependency array for updating the state of bookmark 
    useEffect(() => {
        setmark(props.Bookmark)
    }, [props.Bookmark])

    function handledelete(event) {
        props.onDelete(props.id, props.object_id);
    }

    function handlecontent(event) {
        let type = event.target.id;
        let name = event.target.innerText;
        seteventUpdateHandle((prev) => {
            return {
                ...prev, [type]: name
            }
        })
    }
    async function BookmarkHandle() {
        const newMark = !mark;
        setmark(newMark);
        seteventUpdateHandle((prev) => {
            return { ...prev, Bookmark: newMark }
        })
        //making object ready for updation into the db
        const obj = {
            _id: props.object_id,
            title: props.title,
            content: props.content,
            Bookmark: newMark
        }

        await updateDb(obj, props.object_id, props.coll)

        if (newMark === true) {
            Message(enqueueSnackbar, "Bookmarked", 'success')
        }
    }

    return (
        <div className="note">
            {mark ? <BookmarkIcon className="bookmark" /> : null}
            <form>
                <h1 id="title"
                    onInput={handlecontent}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                >{props.title}</h1>
                <p id="content"
                    onInput={handlecontent}
                    contentEditable={true}
                    suppressContentEditableWarning={true}>
                    {props.content}
                </p>

                <Fab size="large" color="inherit" aria-label="edit">
                    <EditIcon onClick={async () => {

                        /*const obj = {
                            _id: props.object_id,
                            title: eventUpdateHandle.title,
                            content: eventUpdateHandle.content
                        }*/
                        await props.onUpdate(eventUpdateHandle, props.object_id, props.id)
                        Message(enqueueSnackbar, 'Updated', 'success')

                    }} />
                </Fab>
                <Fab size="small" onClick={handledelete}>

                    <DeleteIcon onClick={() => {
                        Message(enqueueSnackbar, 'deleted', 'success')
                    }} />

                </Fab>

                <Fab size="small" onClick={BookmarkHandle}>
                    <Bookmark />
                </Fab>
            </form>
        </div >
    );
}

export default Note;
