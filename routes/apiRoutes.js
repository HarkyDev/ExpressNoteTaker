const router = require('express').Router()
const dbData = require('../db/db.js')



router.get('/notes', (req,res) =>{
    
    dbData
    .getNotes()
    .then((note) =>{
        return res.json(note)
        
    })
    .catch((err) => res.status(500).json(err))
    
});

//post

//delete

module.exports = router