// ===============================================================================
// LOAD DATA
// We are linking our routes to our "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notes = require("../db/db.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User completes a new note and saves it... this data is then sent to the server...
  // Then the server saves the data to the notes db)
  // ----------------------------------------------------------------------------

  app.post("/api/tables", function (req, res) {
    notes.push({ title: req.body.title, text: req.body.text, id: setID() });
    res.json(req.body);
  });

  // VARIABLES FOR DATA
  // =============================================================
  function setID() {
    //  Initially set the id to 0
    newId = 0;
    // Run a for loop
    for (let i = 0; i < notes.length; i++) {
      // If the id of notes[i] doesn't exist...
      if ((notes[i].id = undefined)) {
        // ... set notes[i].id to "i"....
        notes[i].id = i;
        // ...set this note's id to notes[i].id + 1.
        newId = notes[i].id + 1;
        // Else If notes[i].id does exist, but is greater than "id",....
      } else if (notes[i].id > id) {
        // ... set id to notes[i].id + 1.
        newId = notes[i].id + 1;
        // Else set the newId to the current length of the array
      } else {
        newId = notes.length;
      }
      // Return the newID
      return newId;
    }
  }

  // API DELETE Requests
  // Below code handles when a user deletes a post and thus alters the db on the server.
  // ----------------------------------------------------------------------------
  app.delete("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;
    console.log(chosen);
    for (var i = 0; i < notes.length; i++) {
      if (chosen === this[i].id) {
        return res.json(this[i]);
      }
    }

    return res.json(false);
  });
};
