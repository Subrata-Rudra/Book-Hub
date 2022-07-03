const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    // res.send("Hello World! - Say hello to the world and let the world know that you are running on http://localhost:3000")
    res.render('index')
})

module.exports = router