import CreateEmployee from "../application/useCase/CreateEmployee";
import DeleteEmployee from "../application/useCase/DeleteEmployee";
import GetAllEmployees from "../application/useCase/GetAllEmployees";
import GetEmployeeById from "../application/useCase/GetEmployeeById";
import UpdateEmployee from "../application/useCase/UpdateEmployee";
import { EmployeeModel } from "../models/Employee";
import EmployeeController from "./controller/EmployeeController";
import DatabaseConnection from "./database/DatabaseConnection";
import { ExpressAdapter } from "./http/HttpServer";
import EmployeeRepositoryMongoose from "./repository/EmployeeRepositoryMongoose";

DatabaseConnection();

const httpServer = new ExpressAdapter();
const employeeModel = EmployeeModel;
const employeeRepository = new EmployeeRepositoryMongoose(employeeModel);

const createEmployee = new CreateEmployee(employeeRepository);
const deleteEmployee = new DeleteEmployee(employeeRepository);
const getAllEmployees = new GetAllEmployees(employeeRepository);
const getEmployeeById = new GetEmployeeById(employeeRepository);
const updateEmployee = new UpdateEmployee(employeeRepository);

new EmployeeController(httpServer, getEmployeeById, getAllEmployees, createEmployee, updateEmployee, deleteEmployee);


httpServer.listen(3000);
