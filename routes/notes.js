const fs = require("fs");
const uuid = require("./../helpers/uuid");
const db = require("./../db/db.json");

const express = require("express");
const router = express.Router();

// POST request to add a review
router.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body && req.body.title && req.body.text) {
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };

    // Write the string to a file
    fs.readFile(`./db/db.json`, "utf8", (err, data) => {
        const notes = JSON.parse(data);
      notes.push(newNote);
      console.log(notes);
      fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 4), (err) =>
        err
          ? console.error(err)
          : console.log(
              `New note titled ${newNote.title} has been written to JSON file`
            )
      );
    });

    const response = {
      status: "success",
      data: newNote,
    };

    console.log(response);
    
    res.status(201).json(`New note titled ${response.data.title} has been added!`);

  } else {
    res.status(500).json("Request body must contain a title and text");
  }
  res.json(`${req.method} request received`);
  // Log that a POST request was received
  console.log(`${req.method} request received to add a note`);
  // Log the response body to the console

  // somehow take notes from index.js into here and then write to db.json
});

module.exports = router;