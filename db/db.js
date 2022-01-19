const util = require('util');
const fs = require('fs');
const uuid = require('uuid'); 
const { parse } = require('path-posix');  

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


class NoteDb {

    readNote(){
        return readFileAsync('db/db.json', 'utf-8');
    }

    writeNote(data){
        return writeFileAsync('db/db.json', JSON.stringify(data));
    }



    getNotes(){
        return this.readNote().then((note) =>{

            let parsedNoted;

            try{
                parsedNoted = [].concat(JSON.parse(note))

            } catch (err){
                parsedNoted =[]
            }

            return parsedNoted
        })
    }
 

    postNote(newNote){
        const {title, text} = newNote

        if(!title || !text){
            throw new Error('message')
        }

        const addNote = { title, text, id:uuid()}


        return this.getNotes()
        .then((note) => [...note, addNote ])
        .then((updateNote) => this.writeNote(updateNote))
        .then(() => addNote)
    }


    deleteNote(id){

        return this.getNotes()
        .then((note) => note.filter((noteId) => noteId.id !== id))
        .then((filteredNote) => this.writeNote(filteredNote))
    }
}

module.exports = new NoteDb();