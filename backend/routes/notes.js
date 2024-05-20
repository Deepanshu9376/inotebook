const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { query, validationResult } = require("express-validator");

//Route1: Get all notes using: Get "/api/auth/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route2: Add a new notes using: Post "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    query("title", "Enter a valid title").isLength({ min: 3 }),
    query("desciption", "Description must be atleast 5characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route3: Update a note using : Put "/api/auth/updateNote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route4: Delete a note using : Delete "/api/auth/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // const {title,description,tag}=req.body;

  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }
    //allow note to be deleted if user owns this
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
