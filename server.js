const express = require('express');
const apiRoute = require('./routes/apiRoutes.js')
const htmlRoute = require('./routes/htmlRoutes.js')
// const NoteDb = require ("./db/db.js")



const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/api',apiRoute)
app.use('/', htmlRoute)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))





