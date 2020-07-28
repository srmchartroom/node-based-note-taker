// ==============================================================================
// DEPENDENCIES
// Node dependencies (npm packages) used for application/server functionality
// ==============================================================================
var express = require("express");
// // var path = require("path");
// // var fs = require("fs");
// // const { get } = require("http");

// ==============================================================================
// EXPRESS CONFIGURATION
// ...Sets up the basic properties for the app's express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port - either the deployed or local host -- Use this in listener below
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code "starts" our server and listens at the PORT provided:
//    Either the deployed PORT (process.env.PORT)
//    Or the localhost port 8080 (http://localhost:8080)
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

// ** PATH AND ROUTES: HTML routes & API routes

// ** Uses path nodejs package to set ROUTES_DIR var to be based on directory(at the time)/routes
// const ROUTES_DIR = path.resolve(__dirname, "routes");

// ** Combines dynamic ROUTES_DIR with the html_routes.js custom module containing the HTML routes
// const htmlRoutes = path.join(ROUTES_DIR, "html_routes.js");

// ** Combines dynamic ROUTES_DIR with the html_routes.js custom module containing the HTML routes
// const apiRoutes = path.join(ROUTES_DIR, "api_routes.js");

// ** Adds the dependency for the API routes (/routes/api_routes.js)
// ** and HTML routes (/routes/html_routes.js)
// const apiRoutes = require(apiRoutes);
// const htmlRoutes = require(htmlRoutes);

// -----------------------------------------------------------

// ** PATH AND ROUTES: Database path

// ** Use the path nodejs package to set DB_DIR var to be based on the directory(at the time)/db
// const DB_DIR = path.resolve(__dirname, "db");

// ** Combine dynamic DB_DIR var with db.json file
// const dbPath = path.join(DB_DIR, "db.json");

//! Set up a variable to hold the full notes database
// const notes = JSON.parse(fs.readFileSync(dbPath));

// VARIABLES FOR DATA
// =============================================================
// function setID() {
//! Initially set the id to 0
// newId = 0;
//! Run a for loop
// for (let i = 0; i < notes.length; i++) {
//! If the id of notes[i] doesn't exist...
// if ((notes[i].id = undefined)) {
//! ... set notes[i].id to "i"....
// notes[i].id = i;
//! ...set this note's id to notes[i].id + 1.
// newId = notes[i].id + 1;
//! Else If notes[i].id does exist, but is greater than "id",....
// } else if (notes[i].id > id) {
//! ... set id to notes[i].id + 1.
// newId = notes[i].id + 1;
//! Else set the newId to the current length of the array
// } else {
// newId = notes.length;
// }
//! Return the newID
// return newId;
// }
// }

// HTML Routes
// =============================================================

//! WORKING...
// Basic route that sends the to the notes.html page
// app.get("/notes", function (req, res) {
// res.sendFile(path.join(__dirname, "/public/notes.html"));
// });

//! WORKING...
// Basic route that sends the user first to index.html page
// app.get("*", function (req, res) {
// res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// API Routes
// =============================================================

//! WORKING...
// Displays all notes in db.json
// app.get("/api/notes", function (req, res) {
// return res.(dbPath);
// console.log(notes);
// return res.json(dbPath);
// let notes = fs.readFileSync(path.join(__dirname, db / db.json));
// return res.json(notes);
// });

// Receives new note to save on request body and adds it to db.json file; then returns new note to the client
// app.post("/api/notes", function (req, res) {
// req.body is == to the JSON post sent from the user; this works because of our body parsing middleware
// var newNote = {
// title: req.body.title,
// text: req.body.text,
// id: setID(),
// };

// Using a RegEx Pattern to remove spaces from newCharacter
// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
// newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
// console.log(newNote);
// fs.appendFile(dbPath, newNote);
// res.json(true);
// res.end();
// });

// Delete `/api/notes/:id`
// app.delete("/api/notes/:id", function (req, res) {
// var chosen = req.params.id;
// console.log(chosen);
// for (var i = 0; i < notes.length; i++) {
// if (chosen === this[i].id) {
// return res.json(this[i]);
// }
// }

// return res.json(false);
// });

// Starts the server to begin listening
// =============================================================
// app.listen(PORT, function () {
// console.log("App listening on PORT " + PORT);
// });
