// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

// Exports the module so that we can use the HTML routes in our app file.
module.exports = function (app) {
  // HTML GET Requests
  // ...Handles when users "visit" a page.
  // ...In each of the below cases, user is shown a HTML page.
  // ---------------------------------------------------------------------------

  // Basic route that sends the to the notes.html page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Basic route that sends the user first to index.html page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
