// requirements/dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
// port and mysql connection created
var PORT = process.env.PORT || 3056;;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "departments_db",
});
// creates promises
connection.query = util.promisify(connection.query);
init();
// initial prompt with switchcases to determine what function is called
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
    case "View All Roles":
      viewAllRoles();
      break;
    case "View All Departments":
      viewAllDepartments();
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
// add department prompt, and query to insert new department into table labeled dptable.
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
    name: data.adddepartment,
  },
  function (err, res) {
    if (err) throw err;
    console.log("department added!");
    init();
  }
);
};
// add role prompt, and query to insert new role into table labeled role.
function addRoles() {
  // we create an empty array to push the different departments into from dptable
  let departments = []
  connection.query(`SELECT * FROM dptable`, function (err, data) {
    // if (err) throw err;
    // this for loop loops thru the array and to push each department into an array to access later
    for (let i = 0; i < data.length; i++) {
         departments.push(data[i].name)
     }
    // here are the prompts associated with adding a role
     inquirer.prompt([
        {
          name: 'title',
          message: "What is the name of the role?",
          type: 'input'
        },
        {
          name: 'salary',
          message: 'How much is their salary?',
          type: 'input'
        },
        {
          name: 'department_id',
          message: 'What department do they belong in?',
          type: 'list',
          choices: departments
        }
        // this then function destructers our answers as parameters to access in our query
        ]).then(function ({ title, salary, department_id }) {
            let index = departments.indexOf(department_id)
            connection.query(`INSERT INTO role (title, salary, dptid) VALUES ('${title}', '${salary}', ${index})`, function (err, data) {
                if (err) throw err;
                console.log(`Added`)
                init();
            })
        })
  })
};
// This query renames some of our table columns to make them more Readable. 
// It also concatinates the first and last name so they can share a column. 
// It also utilizes alias to set the employee table as e and m to be the manager id in our employee table.
// From there the left and inner joins are introduced.
  async function viewEmployees() {
    const query =  `select  
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
// basic function to view all from role table
 async function viewAllRoles() {
   const query = "SELECT * FROM role";
   const data = await connection.query(query);
   console.table(data);
   init();
    };
    // basic function to view all from departments table
  async function viewAllDepartments() {
    const query = "SELECT * FROM dptable";
    const data = await connection.query(query);
    console.table(data);
    init();
    };  
  // The update roles function uses map to create a list of empoloyees (employeeData) and roles (roleData).
    async function updateroles() {
    const employeeData = await connection.query("SELECT id, CONCAT(firstName,' ',lastName) AS 'name', id FROM employee");
    const roleData = await connection.query("SELECT title, id FROM role");
    const data = await inquirer.prompt([
      {
      name: "update",
      type: "list",
      message: "What employee role would you like you update?",
      choices: employeeData.map((employee) =>({
        name: employee.name,
        value: employee.id,
    }),)}, 
    {
      name: "newrole",
      type: "list",
      message: "What new role would you like you update?",
      choices: roleData.map((role) =>({
        name: role.title,
        value: role.id,
      }),)},
      // Here is the query for updating the new role
    ]).then(function(updated){
    connection.query("UPDATE employee SET roleId = ? WHERE id = ?", [updated.newrole, updated.update], function(err){
      if (err) throw err;
      console.log("role changed!");
      init();
    })
  })
  };
// the same variable of employeeData and roleData are created here to map more choices for our addEmployee prompt
  async function addEmployee() {
  const roleData = await connection.query("SELECT title, id FROM role");
  const employeeData = await connection.query("SELECT id, CONCAT(firstName,' ',lastName) AS 'name', id FROM employee");
  // we destructure the answers to access them again later
  const { fname, lname, Role, Mngr } = await inquirer.prompt([
    {
      name: "fname",
      message: "What is the employee first name?",
    },
    {
      name: "lname",
      message: "What is the employee last name?",
    },
    {
      name: "Role",
      message: "What role would you like to place this employee in?",
      type: "list",
      choices: roleData.map((role) =>({
        name: role.title,
        value: role.id,
      }))
    },
    {
      name: "Mngr",
      type: "list",
      message: "Who is their manager?",
      choices: employeeData.map((employee) =>({
        name: employee.name,
        value: employee.id,
    }),)
    },
]);
// Here is the query showing where the new info will be inserted into  
var query = connection.query(
    "INSERT INTO employee (firstName, lastName, roleid, mngrid) VALUES ( ? , ? , ? , ?)",
    [
      fname,
      lname,
      Role,
      Mngr,
    ],
    function (err, res) {
      if (err) throw err;
      console.log("inserted!");
      init();
    }
  );
};