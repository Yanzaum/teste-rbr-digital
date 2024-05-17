import EmployeeRepository from "../../adapters/EmployeeRepository";

export default class GetAllEmployees {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute() {
        return await this.employeeRepository.getAll();
    }
}