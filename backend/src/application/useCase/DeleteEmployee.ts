import EmployeeRepository from "../../adapters/EmployeeRepository";

export default class DeleteEmployee {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string): Promise<void> {
        const employee = await this.employeeRepository.getById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        await this.employeeRepository.delete(id);
    }
}