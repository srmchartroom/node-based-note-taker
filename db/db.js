const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// ===============================================================================
// DATA
// Below data will hold all of the notes.
// NOTE: Initially, set to a "dummy" notes, but could be an empty array as well.
// ===============================================================================
class DB {
  // read the notes function
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  // getNotes function for DB class

  getNotes() {
    return this.read().then((notes) => {
      let data;
      try {
        data = [].concat(JSON.parse(notes));
      } catch (error) {
        data = [];
      }
      return data;
    });
  }
  // writeNotes function for DB class
  writeNotes(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }
  // addNote function for DB class
  saveNote(newNote) {
    // run getNotes() fuction to get the current notes array in db.json, then...
    return this.getNotes()
      .then((notes) => {
        // if there are no notes in db.json...
        if (notes.length === 0) {
          // set the note.id to "1".
          newNote.id = 1;
          // otherwise,...
        } else {
          // set the id to the id of the last note in the array + 1.
          newNote.id = notes[notes.length - 1].id + 1;
        }
        // Push the new note to notes array in db.json.
        notes.push(newNote);
        return notes;
      })
      .then((newNotes) => this.writeNotes(newNotes))
      .then(() => newNote);
  }

  // deleteNotes function for DB class
  deleteNote(idDelete) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== idDelete))
      .then((newNotes) => this.writeNotes(newNotes));
  }
}
// Exporting the notes array to make accessible in other files via "require".
module.exports = new DB();
