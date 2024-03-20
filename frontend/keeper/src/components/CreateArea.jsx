import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { useSnackbar } from 'notistack';

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [note, setNote] = useState({
        title: "",
        content: "",
        bookmark: false
    });
    //function trigger the input boxes title and content and encapsulate these two into object
    function handleChangeInput(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }
    //function trigger on add note "+"
    function submitNote(event) {
        props.onAdd(note, event);
        setNote({
            title: "",
            content: "",
            bookmark: false
        });

        event.preventDefault();

    }

    function expand() {
        setExpanded(true);
    }
    function Message(msg, variant) {
        enqueueSnackbar(msg, { variant });
    }
    return (
        <div>

            <form className="create-note">
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleChangeInput}
                        value={note.title}
                        placeholder="Title"
                    />
                )}

                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChangeInput}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>

                        <AddIcon onClick={() => {
                            Message('Added', 'success')
                        }} />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
