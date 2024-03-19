import axios from 'axios';
async function insertDb(newNote) {
    try {
        await axios.post('http://localhost:4000/add', newNote); // Use the correct URL for inserting data
        /* setNotes((prevNotes) => {//display the new note while inserting the note into the database
             return [...prevNotes, newNote];
         });*/
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
async function deleteDb(object_id) {
    try {
        axios.patch('http://localhost:4000/update', {
            object_id
        })
        console.log("Delete Success!")
    } catch (err) {
        console.log("Error while deleting")
    }
}
export { insertDb, getdb, updateDb, deleteDb }