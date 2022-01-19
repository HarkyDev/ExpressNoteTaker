const util = require('util');
const fs = require('fs');
let uuid = require('uuid').v4; 

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


class Notes {
    readNote() {
        return readFileAsync("db/db.json", "utf8")
    }
    writeNote(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    addNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = { title, text, id: uuid() }

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.writeNote(updatedNotes))
            .then(() => this.newNote)
    }

    getNotes() {
        return this.readNote()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.writeNote(keptNotes))
    }
}


module.exports = new Notes();