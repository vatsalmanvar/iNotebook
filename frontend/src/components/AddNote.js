import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleOnClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: "default"})
    props.showAlert("Added Successfully", "success")
  }

  const handleOnChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control"  value={note.title} name="title" id="title" aria-describedby="emailHelp" onChange={handleOnChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" value={note.description}  id="description" name="description" onChange={handleOnChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.tag}  id="tag" name="tag" onChange={handleOnChange}/>
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote