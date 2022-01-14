const fs = require("fs");
const uuid = require("./../helpers/uuid");
const db = require("./../db/db.json");

const express = require("express");
const router = express.Router();

// GET request to show note in left column
router.get("/", (req, res) => {
     res.status(201).json(db);
})

// POST request to save a note
router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body.title && req.body.text) {
    const newNote = {
      title,
      text,
      noteId: uuid()
    };

    // Write the string to a file
    fs.readFile(`./db/db.json`, "utf8", (err, data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);
        (err) => console.error(err)
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
    
    res.status(201).json(`New note titled ${response.data.title} has been saved!`);

  } else {
    res.status(500).json("Request body must contain a title and text");
  }
});

router.get("/:noteId", (req, res) => {
    if (req.params.noteId) {
        console.info(`${req.method} request received to get a single note`);
        const noteId = req.params.noteId;
        for (let i = 0; i < db.length; i++) {
          const currentNote = db[i];
          if (currentNote.noteId === noteId) {
            res.status(200).json(currentNote);
            return;
          }
        }
        res.status(404).send('Note not found');
      } else {
        res.status(400).send('Note ID not provided');
      }
  })


router.delete("/:noteId", (req, res) => {
    if (req.params.noteId) {
        // console.info(`${req.method} request received to get a single a review`);
        const noteId = req.params.noteId;
        for (let i = 0; i < db.length; i++) {
          const currentNote = db[i];
          console.log(db[i]);
          db.filter(note => note.noteId === noteId)
        //   if (currentNote.noteId === noteId) {
        //     // fs.readFile(`./db/db.json`, "utf8", (err, data) => {
        //     // const notes = JSON.parse(data);
        //     // console.log(notes);
            fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4))
        //     // })
        //     }
        }  
        res.status(404).send('Review not found');
    } else {
        res.status(400).send('Review ID not provided');
    }
})

module.exports = router;