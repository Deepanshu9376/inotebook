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
router.get(
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

module.exports = router;
