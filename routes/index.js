const express = require('express')
const router = express.Router()

const notes = require('./notes')

router.use('/notes', notes)

module.exports = router;