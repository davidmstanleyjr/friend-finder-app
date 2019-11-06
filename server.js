var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

app. use(express.static(__dirname + "/app/css"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));
app.use(bodyParser.text());

require(".app/routing/htmlRoutes.js")(app);
require("./routing/apiRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);

});