import React ,{useContext}from "react";
import noteContext from "../Context/NoteContext";

const Noteitem = (props) => {
  const Context = useContext(noteContext);
  const { deleteNote } = Context;
  const { note } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body ">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
          </div>
          <p className="card-text justify-content-center">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
