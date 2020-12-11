const asciiart = require("asciiart");
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");
const util = require("util");
var app = express();
var PORT = process.env.PORT || 3056;;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// app.listen(PORT, function() {
//     console.log("Listening on PORT: " + PORT);
// });
const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "departments_db",
});
connection.connect();
connection.query = util.promisify(connection.query);
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
      "View All Roles",
      "View All Departments",
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
      addEmployee();
      break;
    case "View All Employees":
      viewEmployees();
      break;
    // case "View All Roles":
    //   viewAllRoles();
    //   break;
    // case "View All Departments":
    //   viewAllDepartments();
    //   break;
    case "Search Employee":
      employeeSearch();
      break;      
    case "Update Employee Roles":
      updateroles();
      break;   
    case "exit":
      process.exit(0);
      break;
    default:
      break;
  };
};

async function addDepartment() {
  const departmentName = await inquirer.prompt({
    name: "adddepartment",
    type: "input",
    message: "What department would you like to add?",
  });

const data = departmentName;

const query = await connection.query(
  "INSERT INTO dptable SET ?",
  {
    name: data.addDepartment,
  },
);
};
 async function addRoles() {
    const roleName = await inquirer.prompt({
      name: "addroles",
      type: "input",
      message: "What role would you like to add?",
    });
    const data = roleName;

    const query = await connection.query(
      "INSERT INTO role SET ?",
      {
        title: data.addroles,
      },
    );
  };
  
  async function addEmployee() {
    const data = await inquirer.prompt({
      name: "addemployee",
      type: "input",
      message: "Name the employee you would like to add",
    });
  };
  async function viewEmployees() {
    const query = `select  
    dptable.name AS 'Department',
    role.title AS 'Job Title',
    IFNULL(CONCAT(m.firstName, ' ', m.lastName),
    'Top Manager') AS 'Manager',
    CONCAT(e.firstName,' ',e.lastName) AS 'Direct report', 
    role.salary AS 'Employee Salary'
    FROM employee e
    LEFT JOIN employee m on m.id = e.mngrid
    INNER JOIN role on e.roleid = role.id
    INNER JOIN dptable on role.dptid = dptable.id
    ORDER BY manager DESC`
  const data = await connection.query(query);
  console.table(data);
  init();
};

//  async function viewAllRoles() {
//    const query = "SELECT * FROM role";
//    const data = await connection.query(query);
//    console.table(data);
//       // connection.end();
//     };
//   async function viewAllDepartments() {
//     const query = "SELECT * FROM dptable";
//     const data = await connection.query(query);
//     console.table(data);
//         // connection.end();
//     };  
  async function employeeSearch() {
    const data = await inquirer.prompt({
      name: "empsearch",
      type: "input",
      message: "What department would you like to add?",
    });
  };
  async function updateroles() {
    const employeeData = await connection.query("SELECT id, CONCAT(firstName,' ', lastName) AS 'name' , FROM employee");
    console.log(employeeData);
    const data = await inquirer.prompt({
      name: "update",
      type: "list",
      message: "What employee role would you like you update?",
      choices: employeeData.map((employee) =>({
        name: employee.name,
        value: employee.id,
    }
    ))
    });
};


//   inquirer.prompt([{
//     name: "role_id",
//     type: "list",
//     choices: employeeData.map((employee) =>({
//         name: employee.first_name,
//         value: employee.id,
//     }))
// }]).then(function (data) {
//     const roleId = data.role_id
//     console.log(data);
// })
// // * A query which returns all artists who appear within the top 5000 more than once
// async function multiSearch() {
//   const query =
//     "SELECT artist, count(*) AS count FROM top5000 GROUP BY artist HAVING count(*) > 1 ORDER BY count DESC";
//   const data = await connection.query(query);
//   console.table(data);
//   init();
// }
// // * A query which returns all data contained within a specific range
// async function rangeSearch() {
//   const { start, end } = await inquirer.prompt([
//     {
//       name: "start",
//       type: "input",
//       message: "Enter starting position: ",
//       validate: function (value) {
//         if (isNaN(value) === false) {
//           return true;
//         }
//         return false;
//       },
//     },
//     {
//       name: "end",
//       type: "input",
//       message: "Enter ending position: ",
//       validate: function (value) {
//         if (isNaN(value) === false) {
//           return true;
//         }
//         return false;
//       },
//     },
//   ]);

//   const query = `SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ${connection.escape(
//     start
//   )} AND ${connection.escape(end)}`;
//   const data = await connection.query(query);
//   console.table(data);
//   init();
// }

// // * A query which searches for a specific song in the top 5000 and returns the data for it
// async function specificSong() {
//   const { song } = await inquirer.prompt({
//     name: "song",
//     type: "input",
//     message: "What song would you like to look for?",
//   });
//   const data = await connection.query("SELECT * FROM top5000 WHERE ?", {
//     song,
//   });
//   console.table(data);
//   init();
// }

// async function songAndAlbumSearch() {
//   const { artist } = await inquirer.prompt({
//     name: "artist",
//     type: "input",
//     message: "What artist would you like to search for?",
//   });
//   const query = `
//   SELECT top5000.artist, top5000.song, top_albums.year, top_albums.album, top_albums.position
//   FROM top5000 INNER JOIN top_albums
//   ON top_albums.artist = top5000.artist AND top_albums.year = top5000.year
//   WHERE top_albums.artist = ? AND top5000.artist = ?
//   ORDER BY top_albums.position`;

//   const data = await connection.query(query, [artist, artist]);
//   console.table(data);
//   init();
// }
