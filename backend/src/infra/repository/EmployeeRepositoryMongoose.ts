import EmployeeRepository from "../../adapters/EmployeeRepository";
import Employee from "../../domain/Employee";
import { EmployeeModel } from "../../models/Employee";

export default class EmployeeRepositoryMongoose implements EmployeeRepository {
    constructor(
        private readonly employeeModel: typeof EmployeeModel
    ) {
    }

    async getAll() {
        const employeesData = await this.employeeModel.find();
        return employeesData.map(employeeData => {
            return Employee.restore(
                employeeData.id,
                employeeData.name,
                employeeData.department,
                employeeData.role,
                employeeData.admissionDate,
                employeeData.createdAt,
                employeeData.updatedAt
            );
        });
    }

    async getById(id: string) {
        const employeeData = await this.employeeModel.findOne({
            id,
        });
        if (!employeeData) {
            return null;
        }
        const employee = Employee.restore(
            employeeData.id,
            employeeData.name,
            employeeData.department,
            employeeData.role,
            employeeData.admissionDate,
            employeeData.createdAt,
            employeeData.updatedAt
        );
        return employee;
    }

    async save(employee: Employee) {
        await this.employeeModel.create(employee);
    }

    async update(employeeUpdated: Employee) {
        await this.employeeModel.updateOne({ id: employeeUpdated.id }, employeeUpdated);
    }

    async delete(id: string) {
        await this.employeeModel.deleteOne({ id });
    }
}