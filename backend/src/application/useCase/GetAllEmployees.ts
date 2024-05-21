import EmployeeRepository from "../../adapters/EmployeeRepository";
import Employee from "../../domain/Employee";

export default class GetAllEmployees {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute({ search, orderBy, order }: GetAllEmployeesDTO = {}) {
        let employees = await this.employeeRepository.getAll();

        if (search) {
            employees = employees.filter(employee => 
                employee.getName().toLowerCase().includes(search.toLowerCase()) ||
                employee.getDepartment().toLowerCase().includes(search.toLowerCase()) ||
                employee.getRole().toLowerCase().includes(search.toLowerCase())
            );
        }

        if (orderBy) {
            employees.sort((a, b) => {
                // @ts-ignore
                const valueA = a[orderBy];
                // @ts-ignore
                const valueB = b[orderBy];

                if (valueA === undefined || valueB === undefined) return 0;

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return order === 'asc' 
                        ? valueA.localeCompare(valueB, undefined, { sensitivity: 'base' })
                        : valueB.localeCompare(valueA, undefined, { sensitivity: 'base' });
                }

                if (valueA instanceof Date && valueB instanceof Date) {
                    return order === 'asc' 
                        ? valueA.getTime() - valueB.getTime()
                        : valueB.getTime() - valueA.getTime();
                }

                return 0;
            });
        }

        return employees;
    }
}

type GetAllEmployeesDTO = {
    search?: string,
    orderBy?: string,
    order?: string
}