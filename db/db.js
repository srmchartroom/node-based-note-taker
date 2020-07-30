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
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  // getNotes function for DB class
  //! WORKING / DO NOT TOUCH
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
    writeFileAsync("db/db.json", JSON.stringify(notes));
  }
  // addNote function for DB class
  saveNote(note) {
    this.getNotes().then((notes) => {
      if (notes.length === 0) {
        note.id = 1;
      } else {
        note.id = notes[notes.length - 1].id + 1;
      }
      notes.push(note);
      this.writeNotes(notes);
      return JSON.stringify(note);
    }); // push new note to notes array
  }
  // deleteNotes function for DB class
  deleteNote(idDelete) {
    this.getNotes()
      .then((notes) => {
        let newNotes = notes.filter((note) => {
          note.id !== idDelete;
        });
        return newNotes;
      })
      .then((newNotes) => {
        return this.writeNotes(newNotes);
      });
  }

  // return writeFileAsync("db/db.json", JSON.stringify(newNotes));
  // this.writeNotes(newNotes);
  // return JSON.parse(newNotes);
  // }
  // }
  // }
}
// Exporting the notes array to make accessible in other files via "require".
module.exports = new DB();
