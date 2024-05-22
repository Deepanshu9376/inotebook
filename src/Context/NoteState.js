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


    console.log("Adding a note");
    const note = {
      _id: "66489378adda92b064140555a",
      user: "6645aa7a49a8268c3400d13a",
      title: title,
      description: description,
      tag: tag,
      date: "2024-05-18T11:39:38.456Z",
      __v: 0,
    };
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
    console.log(json);

    //Logic to delete
    console.log("Deleting the note with " + id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NWFhN2E0OWE4MjY4YzM0MDBkMTNhIn0sImlhdCI6MTcxNTg1MTk2OX0.e3rT0us34KzndycF34zzFMwdjkCNE-E73Gn4M7JVe64"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();
    console.log(json);

//Logic to edit in client
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }
}

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
