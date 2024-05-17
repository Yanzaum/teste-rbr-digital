import HttpServer from "../../adapters/HttpServer";
import { InvalidParamError } from "../../application/errors/InvalidParamError";
import { zParse } from "../../application/helpers/ZodHelper";
import CreateEmployee from "../../application/useCase/CreateEmployee";
import DeleteEmployee from "../../application/useCase/DeleteEmployee";
import GetAllEmployees from "../../application/useCase/GetAllEmployees";
import GetEmployeeById from "../../application/useCase/GetEmployeeById";
import UpdateEmployee from "../../application/useCase/UpdateEmployee";
import { createEmployeeSchemaBody, deleteEmployeeSchemaParams, getAllEmployeesSchemaQuery, updateEmployeeSchemaBody, updateEmployeeSchemaParams } from "../../application/validators/schemas";

export default class EmployeeController {
	constructor (
		readonly httpServer: HttpServer,
		readonly getEmployeeById: GetEmployeeById,
		readonly getAllEmployees: GetAllEmployees,
		readonly createEmployee: CreateEmployee,
		readonly updateEmployee: UpdateEmployee,
		readonly deleteEmployee: DeleteEmployee
	) {
		httpServer.register("get", "/api/employees", async function (params: any, body: any, query: any) {
			const parsedQuery = await zParse(getAllEmployeesSchemaQuery, query);
			const output = await getAllEmployees.execute(parsedQuery);
			return {
				body: output
			};
		});

		httpServer.register("get", "/api/employees/:{id}", async function (params: any, body: any) {
			try {
				const parsedParams = await zParse(updateEmployeeSchemaParams, params);
				const id = parsedParams.id;
				const output = await getEmployeeById.execute(id);
				return {
					body: output
				};
			} catch (error) {
				return { statusCode: 500, body: { message: "Internal Server Error" } };
			}
		});

		httpServer.register("post", "/api/employees", async function (params: any, body: any) {
			try {
				const parsedBody = await zParse(createEmployeeSchemaBody, body);
				await createEmployee.execute(parsedBody);
				return {
					statusCode: 201,
				};
			} catch (error) {
				if (error instanceof InvalidParamError) {
					return { statusCode: 400, body: error.message };
				}
				return { statusCode: 500, body: "Internal Server Error" };
			}
		});

		httpServer.register("put", "/api/employees/:{id}", async function (params: any, body: any) {
			try {
				const parsedParams = await zParse(updateEmployeeSchemaParams, params);
				const parsedBody = await zParse(updateEmployeeSchemaBody, body);
				const input = {
					id: parsedParams.id,
					...parsedBody
				};
				await updateEmployee.execute(input);
				return {
					statusCode: 204,
				};
			} catch (error) {
				if (error instanceof InvalidParamError) {
					return { statusCode: 400, body: { message: error.message } };
				}
				return { statusCode: 500, body: { message: "Internal Server Error" } };
			}
		});

		httpServer.register("delete", "/api/employees/:{id}", async function (params: any, body: any) {
			try {
				const parsedParams = await zParse(deleteEmployeeSchemaParams, params);
				await deleteEmployee.execute(parsedParams.id);
				return {
					statusCode: 204,
				};
			} catch (error) {
				if (error instanceof InvalidParamError) {
					return { statusCode: 400, body: { message: error.message } };
				}
				return { statusCode: 500, body: { message: "Internal Server Error" } };
			}
		});
	}
}
