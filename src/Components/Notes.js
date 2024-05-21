import React, {useContext} from "react";
import noteContext from "../Context/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";


const Notes = () => {
  const Context = useContext(noteContext);
  const { notes} = Context;
  return (
    <>
      <Addnote/>
      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note}/>
        })}
      </div>
    </>
  );
};

export default Notes;
