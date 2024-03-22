import axios from 'axios';

async function insertDb(newNote, collection_name) {
    try {
        await axios.post('http://localhost:4000/add', { newNote, coll: collection_name }); // Use the correct URL for inserting data
        /* setNotes((prevNotes) => {//display the new note while inserting the note into the database
             return [...prevNotes, newNote];
         });*/
        console.log("Inserted successfully", newNote);
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error; // Optional: rethrow the error for higher-level error handling
    }
}
async function getdb(collection_name) {
    try {
        const response = await axios.get('http://localhost:4000/get', {
            params: {
                coll: collection_name
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Optional: rethrow the error for higher-level error handling
    }
}
async function updateDb(updateNote, uniqueObjId, collection_name) {// This module update a particular note
    try {
        await axios.patch('http://localhost:4000/modify', {
            _id: uniqueObjId,
            title: updateNote.title,
            content: updateNote.content,
            Bookmark: updateNote.Bookmark,
            coll: collection_name
        })
        console.log("update success")
    }
    catch (error) {
        console.log("Error while updating", error)
    }

}
async function deleteDb(object_id, collection_name) {
    try {
        //introducing 500ms delay so that database does not overloaded
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                await axios.delete('http://localhost:4000/deleteOne', {
                    data: { object_id, coll: collection_name }
                })
                return resolve()
            }, 500)
        })

        console.log("Delete Success!")

    } catch (err) {
        console.log("Error while deleting")
    }
}

async function registerUserDetails(user) {
    try {
        await axios.post('http://localhost:4000/register', user)
        return true
    }
    catch (err) {
        return false
    }
}
async function authenticateUser(user) {
    try {
        let flag = await axios.post('http://localhost:4000/auth', user)
        return flag.data.success
    }
    catch (err) {
        return "somethin went wrong ";
    }

}

export { insertDb, getdb, updateDb, deleteDb, registerUserDetails, authenticateUser }