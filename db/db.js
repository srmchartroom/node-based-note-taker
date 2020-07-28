const fs = require("fs");

// ===============================================================================
// DATA
// Below data will hold all of the notes.
// NOTE: Initially, set to a "dummy" notes, but could be an empty array as well.
// ===============================================================================
class DB {
  read() {
    return fs.readFile("db.json", "utf8");
  }
  getNotes() {
    return this.read().then((notes) => {
      let data;
      try {
        data = [].concat(JSON.parse(notes));
      } catch (error) {
        data = [];
      }
    });
  }
}

// Exporting the notes array to make accessible in other files via "require".
module.exports = new DB();
