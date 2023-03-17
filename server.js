const express = require("express");
const app = express();
import bodyParser from 'body-parser';
import { getEmployeeList ,findEmployeeById } from "./user";
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const EmployeeList = getEmployeeList(); // assume for now this is your database

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


// GET Call for all Employees
app.get("/Employees", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "Employees",
    Employees: EmployeeList,
  });
});

app.get("/", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "Employees",
    Employees: EmployeeList,
  });
});

//  POST call - Means you are adding new Employee into database 

app.post("/addEmployee", (req, res) => {

  if (!req.body.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!req.body.Team) {
    return res.status(400).send({
      success: "false",
      message: "Team is required",
    });
  }
  const Employee = {
    id: EmployeeList.length + 1,
    name:  req.body.name,
    Team: req.body.Team,
    status:  req.body.status
  };
  EmployeeList.push(Employee);
  return res.status(201).send({
    success: "true",
    message: "Employee added successfully",
    Employee,
  });
});

//  PUt call - Means you are updating new Employee into database 

app.put("/Employee/:EmployeeId", (req, res) => {
  console.log(req.params)
  const id = parseInt(req.params.EmployeeId, 10);
  const EmployeeFound=findEmployeeById(id)
  

  if (!EmployeeFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Employee not found',
    });
  }

  const updatedEmployee= {
      id: id,
      name:req.body.name || EmployeeFound.body.name,
      Team: req.body.Team || EmployeeFound.body.Team,
      status: req.body.status || EmployeeFound.body.status
   
  };

  if (!updatedEmployee.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!updatedEmployee.Team) {
    return res.status(400).send({
      success: "false",
      message: "Team is required",
    });
  }

  for (let i = 0; i < EmployeeList.length; i++) {
      if (EmployeeList[i].id === id) {
        EmployeeList[i] = updatedEmployee;
          return res.status(201).send({
            success: 'true',
            message: 'Employee updated successfully',
            updatedEmployee
          
          });
      }
  }
  return  res.status(404).send({
            success: 'true',
            message: 'error in update'
           
     });
})

//  Delete call - Means you are deleting new employee from database 

app.delete("/Employee/:EmployeeId", (req, res) => {
  console.log(req.params)
  const id = parseInt(req.params.EmployeeId, 10);
  console.log(id)
  for(let i = 0; i < EmployeeList.length; i++){
      if(EmployeeList[i].id === id){
        EmployeeList.splice(i,1);
           return res.status(201).send({
            success: 'true',
            message: 'employee deleted successfully'
          });
      }
  }
  return res.status(404).send({
              success: 'true',
              message: 'error in delete'   
    });
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
  console.log("server listening on port 8000!");
});
