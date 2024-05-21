import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    // const s={
    //     "name":"Harry",
    //     "class":"5b"
    // }
    // const [state,setState]=useState(s);
    // const update=()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name":"deepdk",
    //             "class":"10b"

    //         })
    //     },1000)
    // }
    const notesInitial=[
      {
        "_id": "6645f2a23766ccc348b2a1f66f",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my name",
        "description": "srbsidn tihen the theinf",
        "tag": "personal",
        "date": "2024-05-16T11:48:50.115Z",
        "__v": 0
      },
      {
        "_id": "6645f2ef372ccc348b2a1f671",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my name",
        "description": "srbsidn tihen the theinf",
        "tag": "personal",
        "date": "2024-05-16T11:50:07.674Z",
        "__v": 0
      },
      {
        "_id": "6645f2f837ccc348b72a1f673",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my ceds",
        "description": "srbsidn tihesdfsn the theinf",
        "tag": "personalv",
        "date": "2024-05-16T11:50:16.967Z",
        "__v": 0
      },
      {
        "_id": "6645f3b8a15d0e13b93f49c72",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my ceds",
        "description": "srbsidn tihesdfsn the theinf",
        "tag": "personalv",
        "date": "2024-05-16T11:53:28.671Z",
        "__v": 0
      },
      {
        "_id": "66488eb0dda92b06414055152",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my world",
        "description": "srbsidn tihed cs sdfsn the theinf",
        "tag": "personalv",
        "date": "2024-05-18T11:19:12.781Z",
        "__v": 0
      },
      {
        "_id": "66488ebad3da92b0641405554",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my world",
        "description": "srbsidn tihed cs sdfsn the theinf",
        "tag": "General",
        "date": "2024-05-18T11:19:22.870Z",
        "__v": 0
      },
      {
        "_id": "664828ed9dda92b0641405558",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my world",
        "description": "srbsidn tihed cs sdfsn the theinf",
        "tag": "General",
        "date": "2024-05-18T11:19:53.761Z",
        "__v": 0
      },
      {
        "_id": "6648937add6a92b064140555a",
        "user": "6645aa7a49a8268c3400d13a",
        "title": "my world",
        "description": "srbsidn tihed cs sdfsn the theinf",
        "tag": "General",
        "date": "2024-05-18T11:39:38.456Z",
        "__v": 0
      }
    ]

    const [notes,setNotes]=useState(notesInitial);

    //Add a note
    const addNote=(title,description,tag)=>{
      //TODO api call
      console.log("adding a note")
      const note={
        "_id": "66489378adda92b064140555a",
        "user": "6645aa7a49a8268c3400d13a",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-05-18T11:39:38.456Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote=(id)=>{
      //TODO : api call
      console.log("Deleting the note with "+id)
      const newnotes=notes.filter((note)=>{return (note._id!==id)})
      setNotes(newnotes);
    }

    //Edit a note
    const editNote=(id,title,description,tag)=>{

    }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;