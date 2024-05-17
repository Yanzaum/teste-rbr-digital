import EmployeeRepository from "../../adapters/EmployeeRepository";
import Employee from "../../domain/Employee";

export default class GetEmployeeById {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string): Promise<Employee | null> {
        return await this.employeeRepository.getById(id);
    }
}