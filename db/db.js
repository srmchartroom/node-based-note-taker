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
  //! WORKING / DO NOT TOUCH ----------------
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
  //! ----------------------------------------
  // addNote function for DB class
  addNote(note) {
    this.getNotes().then((notes) => {
      note.id = parseInt(notes[notes.length - 1].id) + 1; // create UID
      notes.push(note);
      return this.writeNotes(notes);
    }); // push new note to notes array
  }
  // writeNotes function for DB class
  writeNotes(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }
  // deleteNotes function for DB class
  deleteNotes(dID) {
    this.getNotes().then((notes) => {
      let newNotes = notes.filter(function (note) {
        return parseInt(note.id) !== parseInt(dID);
      });
      console.log(newNotes);
      return this.writeNotes(newNotes);
    });
  }
}

// Exporting the notes array to make accessible in other files via "require".
module.exports = new DB();
