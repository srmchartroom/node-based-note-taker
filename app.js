//! Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up db path
//! Render function's components to make team html and output to output folder
// Use the path nodejs package to set DB_DIR var to be based on the directory at the time
const DB_DIR = path.resolve(__dirname, "db");
// Combine dynamic DB_DIR var with db.json file
const dbPath = path.join(DB_DIR, "db.json");

// HTML Routes
// =============================================================

//! WORKING...
// Basic route that sends the to the notes.html page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//! WORKING...
// Basic route that sends the user first to index.html page
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API Routes
// =============================================================

//! WORKING...
// Displays all notes in db.json
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Receives new note to save on request body and adds it to db.json file; then returns new note to the client
app.post("/api/notes", function (req, res) {
  //? req.body is == to the JSON post sent from the user; this works because of our body parsing middleware
  var newNote = req.body;

  //? Using a RegEx Pattern to remove spaces from newCharacter
  //? You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);

  notes.push(newNote);

  res.json(true);
});

// Delete `/api/notes/:id`
app.delete("/api/notes/:id", function (req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen === this[i].routeName) {
      return res.json(this[i]);
    }
  }

  return res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
