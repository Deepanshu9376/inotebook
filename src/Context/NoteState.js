import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial = [];

  //Get all notes
  const getNotes = async () => {
    //TODO api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NWFhN2E0OWE4MjY4YzM0MDBkMTNhIn0sImlhdCI6MTcxNTg1MTk2OX0.e3rT0us34KzndycF34zzFMwdjkCNE-E73Gn4M7JVe64"
      },
    });
    const json=await response.json();
    console.log(json);
    setNotes(json);
  };
   

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NWFhN2E0OWE4MjY4YzM0MDBkMTNhIn0sImlhdCI6MTcxNTg1MTk2OX0.e3rT0us34KzndycF34zzFMwdjkCNE-E73Gn4M7JVe64"
      },
      body: JSON.stringify({title,description,tag})
    });
    const note=await response.json();
    setNotes(notes.concat(note));

  };

  //Delete a note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NWFhN2E0OWE4MjY4YzM0MDBkMTNhIn0sImlhdCI6MTcxNTg1MTk2OX0.e3rT0us34KzndycF34zzFMwdjkCNE-E73Gn4M7JVe64"
      },
  
    });
    const json = response.json();
    // console.log(json);

    //Logic to delete
    // console.log("Deleting the note with " + id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NWFhN2E0OWE4MjY4YzM0MDBkMTNhIn0sImlhdCI6MTcxNTg1MTk2OX0.e3rT0us34KzndycF34zzFMwdjkCNE-E73Gn4M7JVe64"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    // console.log(json);

  let nayenotes=JSON.parse(JSON.stringify(notes));
  //Logic to edit in client
  for (let index = 0; index < nayenotes.length; index++) {
    const element = nayenotes[index];
    if (element._id === id) {
      nayenotes[index].title = title;
      nayenotes[index].description = description;
      nayenotes[index].tag = tag;
      break;
    }
  }
  setNotes(nayenotes);
}

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
