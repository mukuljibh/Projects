import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Fab from "@material-ui/core/Fab";
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { useSnackbar } from 'notistack';
import Bookmark from "@mui/icons-material/Bookmark";

function Note(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [eventUpdateHandle, seteventUpdateHandle] = useState({ title: "", content: "" });
    const [mark, setmark] = useState(false);

    function handledelete() {

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

    function Message(msg, variant) {
        enqueueSnackbar(msg, { variant });
    }
    function BookmarkHandle() {
        setmark((prev) => {
            return !prev;
        })
        if (mark === false) {
            Message("Bookmarked", 'success')
        }

    }
    return (
        <div className="note">
            {mark ? <BookmarkIcon className="bookmark" /> : null}
            <h1 id="title" onInput={handlecontent} contentEditable={true} >{props.title}</h1>
            <p id="content" onInput={handlecontent} contentEditable={true}> {props.content} </p>

            <Fab size="large" color="inherit" aria-label="edit">
                <EditIcon onClick={async () => {

                    /*const obj = {
                        _id: props.object_id,
                        title: eventUpdateHandle.title,
                        content: eventUpdateHandle.content
                    }*/
                    await props.onUpdate(eventUpdateHandle, props.object_id, props.id)
                    Message('Updated', 'success')

                }} />
            </Fab>
            <Fab size="small" onClick={handledelete}>

                <DeleteIcon onClick={() => {
                    Message('deleted', 'success')
                }} />

            </Fab>

            <Fab size="small" onClick={BookmarkHandle}>
                <Bookmark />
            </Fab>

        </div >
    );
}

export default Note;
