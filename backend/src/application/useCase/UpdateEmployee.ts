import EmployeeRepository from "../../adapters/EmployeeRepository";
import Employee from "../../domain/Employee";

export default class UpdateEmployee {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute({
        id,
        name,
        department,
        role,
        admissionDate
    }: UpdateEmployeeDTO): Promise<void> {
        const employee = await this.employeeRepository.getById(id);
        if (!employee) throw new Error('Employee not found');
        const updatedEmployee = employee.update(name, department, role, admissionDate);
        await this.employeeRepository.update(updatedEmployee);
    }
}

type UpdateEmployeeDTO = {
    id: string,
    name: string,
    department: string,
    role: string,
    admissionDate: Date
}