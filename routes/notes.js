const fs = require("fs");
const uuid = require("./../helpers/uuid");
const db = require("./../db/db.json");

const express = require("express");
const router = express.Router();

// GET request to show note in left column
router.get("/", (req, res) => {
     res.status(200).json(db);
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
        console.log(notes);
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

// router.get("/:noteId", (req, res) => {
//     if (req.params.noteId) {
//         console.info(`${req.method} request received to get a single note`);
//         const noteId = req.params.noteId;
//         for (let i = 0; i < db.length; i++) {
//           const currentNote = db[i];
//           if (currentNote.noteId === noteId) {
//             res.status(200).json(currentNote);
//             return;
//           }
//         }
//         res.status(404).send('Note not found');
//       } else {
//         res.status(400).send('Note ID not provided');
//       }
//   })


router.delete("/:id", (req, res) => {
    if (req.params.id) {
        console.log(req.params.id);
        console.info(`${req.method} request received to delete a single note`);
        const noteId = req.params.id;
        for (let i = 0; i < db.length; i++) {
          const currentNote = db[i];
          if (currentNote.id === noteId) {
            // res.status(200).json(currentNote);
            fs.readFile(`./db/db.json`, "utf8", (err, data) => {
                const notes = JSON.parse(data);
                Object.values(notes).filter(currentNote);
                (err) => console.error(err)
              fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 4), (err) =>
                err
                  ? console.error(err)
                  : console.log(
                      `Note titled ${currentNote.title} has been deleted from JSON file`
                    )
              );
            });
          }
        }
        res.status(404).send('Note not found');
      } else {
        res.status(400).send('Note ID not provided');
      }
})

module.exports = router;