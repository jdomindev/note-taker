const express = require('express');
const path = require('path');
const db = require('./db/db.json')

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


// POST request to add a review
app.post('/notes', (req, res) => {
    res.json(`${req.method} request received`)
  // Log that a POST request was received
  console.log(`${req.method} request received to add a note`);
  // Log the response body to the console
  console.log(req.body);
    // somehow take notes from index.js into here and then write to db.json
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

// Prepare a response object to send back to the client
// let response;

// Check if there is anything in the response body
// if (req.body && req.body.product) {
//     response = {
//       status: 'success',
//       data: req.body,
//     };
//     res.json(`Review for ${response.data.product} has been added!`);
//   } else {
//     res.json('Request body must at least contain a product name');
//   }