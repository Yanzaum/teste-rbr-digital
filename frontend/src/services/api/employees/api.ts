import { api } from "../apiService";
import { EmployeeData, EmployeeGateway } from "./interface/EmployeeGateway";
import { Employee } from "./types/employee";

export class APIEmployeeService implements EmployeeGateway {
    async getEmployees(search?: string, orderBy?: string, order?: string): Promise<Employee[]> {
        const response = await api.get("/employees", {
            params: {
                search,
                orderBy,
                order
            }
        });
        return response.data;
    }

    async getEmployee(id: string): Promise<Employee> {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    }

    async createEmployee(employee: EmployeeData): Promise<void> {
        return await api.post("/employees", employee);
    }

    async updateEmployee(id: string, employee: EmployeeData): Promise<void> {
        return await api.put(`/employees/${id}`, employee);
    }
    
    async deleteEmployee(id: string): Promise<void> {
        return await api.delete(`/employees/${id}`);
    }

}