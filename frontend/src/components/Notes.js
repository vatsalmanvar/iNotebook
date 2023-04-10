import React, {useState, useContext, useEffect, useRef} from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const {notes, getNotes, editNote} = context;
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  },[])

  const ref = useRef(null)

  const updateNote = (currentnote)=>{ 
    ref.current.click();
    setNote({id:currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
  }
  
  const handleOnClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success")
  }

  const handleOnChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
    
  }

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" name="etitle" id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={handleOnChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleOnChange}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss='modal' >Close</button>
            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleOnClick} className="btn btn-primary" data-bs-dismiss='modal' >Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
          {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note)=>{
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
         })}
    </div>

    </>
  )
}

export default Notes
