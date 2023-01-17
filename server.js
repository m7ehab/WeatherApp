// Require Express to run server and routes
const express= require('express');
// Start up an instance of app
const app = express();
// Cors for cross origin allowance
const cors = require("cors");
// Enable All CORS Requests
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// declare object for routes
projectData = {};
// Initialize the main project folder
app.use(express.static('website'));

/*ROUTES*/
// GET Route
app.get("/all", (request, response) => response.status(200).send(projectData));

// POST Route
app.post("/add", (request, response) => {
  projectData = request.body;
  console.log(projectData);
  res.status(200).send(projectData);
});

// Setup Server
const port = 8000;
const hostname = "localhost";
// Testing server 
const listening = () => console.log(`Server running at http://${hostname}:${port}/`);
app.listen(port, listening);


