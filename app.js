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

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// * HTML Routes
// * =============================================================
// Basic route that sends the user to notes.html page on PORT+"/notes"
//! THIS WORKS - DO NOT TOUCH
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//! -------------------------

// API Routes
// =============================================================

// * ------------------------------------------
// Displays all notes in db.json
//! THIS WORKS - DO NOT TOUCH
app.get("/api/notes", function (req, res) {
  DB.getNotes()
    .then(function (notes) {
      res.json(notes);
    })
    .catch(function (err) {
      res.status(500).json(err);
      console.log(err);
    });
});
//! ------------------------

// Delete `/api/notes/:id`
app.delete("/api/notes/:id", function (req, res) {
  DB.deleteNote(parseInt(req.params.id))
    .then(function () {
      res.json({ ok: true });
    })
    .catch(function (err) {
      res.status(500).json(err);
      console.log(err);
    });
});

// Receives new note to save on request body and adds it to db.json file; then returns new note to the client
app.post("/api/notes", function (req, res) {
  DB.saveNote(req.body)
    .then(function (newnote) {
      console.log(newnote);
      res.json(newnote);
    })
    .catch(function (err) {
      res.status(500).json(err);
      console.log(err);
    });
});

// * ------------------------------------------

// Basic route that sends the user first to index.html page
//! THIS WORKS - DO NOT TOUCH
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
//! -------------------------
// * =============================================================

// =============================================================================
// LISTENER
// The below code "starts" our server and listens at the PORT provided:
//    Either the deployed PORT (process.env.PORT)
//    Or the localhost port 8080 (http://localhost:8080)
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
