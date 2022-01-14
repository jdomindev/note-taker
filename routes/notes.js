const fs = require('fs');
const uuid = require('./../helpers/uuid');
// const fsUtils = require('./../helpers/fsUtils')
const db = require('./../db/db.json');

const express = require('express');
const router = express.Router();

// GET request to show note in left column
router.get('/', (req, res) => {
  fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
     res.status(200).json(JSON.parse(data));
})
});

// POST request to save a note
router.post('/', (req, res) => {
  const { title, text } = req.body;
  if (req.body.title && req.body.text) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    // Write the string to a file
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
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
      status: 'success',
      data: newNote,
    };
    
    res.status(201).json(`New note titled ${response.data.title} has been saved!`);

  } else {
    res.status(500).json('Request body must contain a title and text');
  }
});

router.delete('/:id', (req, res) => {
  if (req.params.id) {
      const noteId = req.params.id;
      fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        // Object.values(notes).filter(currentNote);
        (err) => console.error(err)
        const newNotes = notes.filter(note => note.id !== noteId)
        fs.writeFile(`./db/db.json`, JSON.stringify(newNotes, null, 2), (err) => {
          err
            ?  res.status(404).send(err)
            :  res.status(200).send(`Note with an ID: ${noteId} was deleted`)
        });
    })
    } else {
      res.status(400).send('Note ID not provided');
    }
})

module.exports = router;