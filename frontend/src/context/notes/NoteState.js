import React, {useState} from "react";
import NoteContext from "./noteContext";
    
const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    // Get all notes
    const getNotes = async()=>{
        // api calls
        const responce = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await responce.json();
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag)=>{
        // api calls
        const responce = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await responce.json();
        setNotes(notes.concat(note));
    }
    
    // Delete a note
    const deleteNote = async(id)=>{
        // api calls
        const responce = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = responce.json();
        console.log(json);
        //logic
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }

    // edit a note
    const editNote = async (id, title, description, tag)=>{
        // api calls
        const responce = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await responce.json();
        console.log(json);
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to edit notes
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;