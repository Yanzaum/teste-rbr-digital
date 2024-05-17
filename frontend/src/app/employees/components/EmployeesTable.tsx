import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import EmployeesActions from './EmployeesActions'
import { useQuery } from '@tanstack/react-query'
import { employeeService } from '@/services/api/employees'

export default function EmployeesTable() {
    const {
        data: employees,
        isLoading,
        error: errorOnLoadEmployees,
    } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeService.getEmployees,
    })

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Cargo</Th>
                        <Th>Departamento</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isLoading && (
                        <Tr>
                            <Td colSpan={4}>Carregando...</Td>
                        </Tr>
                    )}
                    {errorOnLoadEmployees && (
                        <Tr>
                            <Td colSpan={4}>Erro ao carregar colaboradores</Td>
                        </Tr>
                    )}
                    {employees?.map((employee) => (
                        <Tr key={employee.id}>
                            <Td>{employee.name}</Td>
                            <Td>{employee.role}</Td>
                            <Td>{employee.department}</Td>
                            <Td>
                                <EmployeesActions id={employee.id} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}