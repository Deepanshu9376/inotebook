import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const s={
        "name":"Harry",
        "class":"5b"
    }
    const [state,setState]=useState(s);
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"deepdk",
                "class":"10b"

            })
        },1000)
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;