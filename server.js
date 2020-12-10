const asciiart = require("asciiart");
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");
var app = express();
var PORT = process.env.PORT || 3056;;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT);
});

init();

async function init() {
  const { action } = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "Add Department",
      "Add Roles",
      "Add Employee",
      "View All Employees",
      "Update Employee Roles",
      "exit",
    ],
  });

  switch (action) {
    case "Add Department":
      addDepartment();
      break;
    case "Add Roles":
      addRoles();
      break;
    case "Add Employee":
      rangeSearch();
      break;
    case "View All Employees":
      songAndAlbumSearch();
      break;
    case "Search Employee":
      songAndAlbumSearch();
      break;      
    case "Update Employee Roles":
      songAndAlbumSearch();
      break;   
    case "exit":
      process.exit(0);
      break;
    default:
      break;
  };
};

