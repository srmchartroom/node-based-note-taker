// ==============================================================================
// DEPENDENCIES
// Node dependencies (npm packages) used for application/server functionality
// ==============================================================================
var express = require("express");

// * ----------------------------
var path = require("path");
var fs = require("fs");
var DB = require("./db/db.js");

// * ----------------------------

// ==============================================================================
// EXPRESS CONFIGURATION
// ...Sets up the basic properties for the app's express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port - either deployed or local host -- Uses this in listener far below
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static("db"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

//! ----------------------
// // require("./routes/api_routes")(app);
// // require("./routes/html_routes")(app);
//! ----------------------

//* --------------------------------
// PATH AND ROUTES: Database path

// Use the path nodejs package to set DB_DIR var to be based on the directory(at the time)/db
// const DB_DIR = path.resolve(__dirname, "db");

// Combine dynamic DB_DIR var with db.json file
// const dbPath = path.join(DB_DIR, "db.json");

// Set up a variable to hold the full notes database
// const notes = JSON.parse(fs.readFileSync(dbPath));

// * ------------------------------

// let notes = "";
// function getNotes() {
// let notesArray = fs.readFileSync(dbPath);
// notes = JSON.parse(notesArray);
// }

// * -----------------------------
// VARIABLES FOR DATA
// =============================================================

// Function to set the ID for the new notes...
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
// * -----------------------------

// * HTML Routes
// * =============================================================
// Basic route that sends the user to notes.html page on PORT+"/notes"
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// Basic route that sends the user first to index.html page
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// * =============================================================

// API Routes
// =============================================================

// * ------------------------------------------
// Displays all notes in db.json
app.get("/api/notes", function (req, res) {
  // getNotes();
  // res.json(notes);
  // res.sendFile(dbPath);
  // fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (error, data) {
  //     if (error) {
  //       return console.log(error);
  //     }

  //     console.log(data);
  //   })
  // );
  const notesArray = DB.getNotes();
  res.json(notesArray);
});
// * ------------------------------------------

// Receives new note to save on request body and adds it to db.json file; then returns new note to the client
app.post("/api/notes", function (req, res) {
  var newNote = {
    title: req.body.title,
    text: req.body.text,
    id: setID(),
  };
  fs.appendFileSync("db/db.json", newNote, "utf8");
  res.send(newNote);
  console.log(newNote);
});

// Delete `/api/notes/:id`
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

// =============================================================================
// LISTENER
// The below code "starts" our server and listens at the PORT provided:
//    Either the deployed PORT (process.env.PORT)
//    Or the localhost port 8080 (http://localhost:8080)
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
