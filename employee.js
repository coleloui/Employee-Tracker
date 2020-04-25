var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "startChoice",
      message: "Would you like to Add, View, Update, or Delete something?",
      choices: ["Add", "View", "Update", "Delete"],
    })
    .then(function (answer) {
      switch (answer.startChoice) {
        case "Add":
          add();
          break;
        case "View":
          view();
          break;
        case "Update":
          update();
          break;
        case "Delete":
          deleter();
          break;
        default:
          exit();
          break;
      }
    });
}

const exit = () => {
  console.log("This is the end. Goodbye!");
  connection.end();
};

const add = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addChoice",
        message: "What would you like to add?",
        choices: [
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Go back",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.addChoice) {
        case "Add a new department":
          addDep();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmp();
          break;
        case "Go back":
          start();
          break;
        case "Exit":
          exit();
          break;
        default:
          break;
      }
    });
};

const addDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "newDepName",
      },
    ])
    .then(function (newDep) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: newDep.newDepName,
        },
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
            add();
          });
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What role would you like to add?",
        name: "newRoleName",
      },
      {
        type: "number",
        message: "How much does this role make /hr?",
        name: "newRoleSalary",
      },
      {
        type: "number",
        message: "What Department does this role belong to?",
        name: "newRoleDep",
      },
    ])
    .then(function (newRole) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: newRole.newRoleName,
          salary: newRole.newRoleSalary,
          department_id: newRole.newRoleDep,
        },
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            console.table(data);
            add();
          });
        }
      );
    });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your new Employee's first name?",
        name: "newEmpFirstName",
      },
      {
        type: "input",
        message: "What is your new Employee's last name?",
        name: "newEmpLastName",
      },
      {
        type: "number",
        message: "What is the Role Id that your Employee belongs to?",
        name: "newEmpRoleId",
      },
      {
        type: "number",
        message: "What is the Id of the Manager that your Employee reports to?",
        name: "newEmpManagerId",
      },
    ])
    .then(function (newEmp) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: newEmp.newEmpFirstName,
          last_name: newEmp.newEmpLastName,
          role_id: newEmp.newEmpRoleId,
          manager_id: newEmp.newEmpManagerId,
        },
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM employees", function (err, data) {
            if (err) throw err;
            console.table(data);
            add();
          });
        }
      );
    });
};

const view = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewChoice",
        message: "What would you like to view?",
        choices: [
          "View a department",
          "View a role",
          "View a employee",
          "Go back",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.viewChoice) {
        case "View a department":
          viewDep();
          break;
        case "View a role":
          viewRole();
          break;
        case "View a employee":
          viewEmp();
          break;
        case "Go back":
          start();
          break;
        case "Exit":
          exit();
          break;
        default:
          break;
      }
    });
};

const viewDep = () => {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    console.table(data);
    view();
  });
};

const viewRole = () => {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    console.table(data);
    view();
  });
};

const viewEmp = () => {
  connection.query("SELECT * FROM employees", function (err, data) {
    if (err) throw err;
    console.table(data);
    view();
  });
};

const update = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updateChoice",
        message: "What would you like to update?",
        choices: [
          "Update a department",
          "Update a role",
          "Update a employee",
          "Go back",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.updateChoice) {
        case "Update a department":
          updateDep();
          break;
        case "Update a role":
          updateRole();
          break;
        case "Update a employee":
          updateEmp();
          break;
        case "Go back":
          start();
          break;
        case "Exit":
          exit();
          break;
        default:
          break;
      }
    });
};

const updateDep = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "update",
        message: "Which would you like to update?",
        choices: ["Update Department Name", "Update Department Id"],
      },
    ])
    .then(function (answer) {
      switch (answer.update) {
        case "Update Department Name":
          upDepName();
          break;
        case "Update Department Id":
          upDepId();
          break;
      }
    });
};

const upDepName = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "updateDepIdName",
        message: "Select the Department Id which you would like to rename.",
      },
      {
        type: "input",
        name: "updateDepName",
        message: "What would you like to rename this Department to?",
      },
    ])
    .then(function (updated) {
      connection.query(
        "UPDATE department SET ? WHERE ?",
        [{ name: updated.updateDepName }, { id: updated.updateDepIdName }],
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
            update();
          });
        }
      );
    });
};

const upDepId = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "updateIdDepId",
        message: "Select the Department Id which you would like to update.",
      },
      {
        type: "input",
        name: "updateDepId",
        message: "What would you like to change this Department Id to?",
      },
    ])
    .then(function (updated) {
      connection.query(
        "UPDATE department SET ? WHERE ?",
        [{ id: updated.updateIdDepId }, { id: updated.updateDepId }],
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
            update();
          });
        }
      );
    });
};

const updateEmp = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "updateEmpId",
        message: "Select the Employee Id whose role you would like to update.",
      },
      {
        type: "number",
        name: "updateEmpRole",
        message: "What would you like to change this Employee Role to?",
      },
    ])
    .then(function (updated) {
      connection.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [updated.updateEmpRole, updated.updateEmpId],
        function (err, data) {
          if (err) throw err;
          console.log("hi");
          connection.query("SELECT * FROM employees", function (err, data) {
            if (err) throw err;
            console.table(data);
            update();
          });
        }
      );
    });
};

const deleter = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteChoice",
        message: "What would you like to delete?",
        choices: [
          "Delete a department",
          "Delete a role",
          "Delete a employee",
          "Go back",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.deleteChoice) {
        case "Delete a department":
          deleteDep();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete a employee":
          deleteEmp();
          break;
        case "Go back":
          start();
          break;
        case "Exit":
          exit();
          break;
        default:
          break;
      }
    });
};

const deleteDep = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "deleteDep",
        message: "Enter the id of the department that you wish to delete.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM department WHERE id = ?",
        [answer.deleteDep],
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
            deleter();
          });
        }
      );
    });
};

const deleteRole = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "deleteRole",
        message: "Enter the id of the Role that you wish to delete.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM role WHERE id = ?",
        [answer.deleteRole],
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            console.table(data);
            deleter();
          });
        }
      );
    });
};

const deleteEmp = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "deleteEmp",
        message: "Enter the id of the Employee that you wish to delete.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM employees WHERE id = ?",
        [answer.deleteEmp],
        function (err, data) {
          if (err) throw err;
          console.table(data);
          connection.query("SELECT * FROM employee", function (err, data) {
            if (err) throw err;
            console.table(data);
            deleter();
          });
        }
      );
    });
};
