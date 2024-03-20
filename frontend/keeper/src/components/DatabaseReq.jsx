
import axios from 'axios';
async function insertDb(newNote) {
    try {
        await axios.post('http://localhost:4000/add', newNote); // Use the correct URL for inserting data
        /* setNotes((prevNotes) => {//display the new note while inserting the note into the database
             return [...prevNotes, newNote];
         });*/
        console.log("Inserted successfully", newNote);
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
async function updateDb(updateNote, uniqueObjId, bookmark) {// This module update a particular note
    try {
        await axios.patch('http://localhost:4000/modify', {
            _id: uniqueObjId,
            title: updateNote.title,
            content: updateNote.content,
            Bookmark: bookmark
        })
        console.log("update success")
    }
    catch (error) {
        console.log("Error while updating", error)
    }

}
async function deleteDb(object_id) {
    try {
        await axios.delete('http://localhost:4000/deleteOne', {
            data: { object_id }
        })
        console.log("Delete Success!")

    } catch (err) {
        console.log("Error while deleting")
    }
}
export { insertDb, getdb, updateDb, deleteDb }