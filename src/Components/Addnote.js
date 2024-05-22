import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import noteContext from "../Context/NoteContext";

const Addnote = () => {
  const Context = useContext(noteContext);
  const { addNote } = Context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  return (
    <div className="container my-3">
      <h1>Add Your Notes</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Desctiption" name="description"
            onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" placeholder="Enter Tag" name="tag"
            onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Add Note
        </Button>
      </Form>
    </div>
  );
};

export default Addnote;
