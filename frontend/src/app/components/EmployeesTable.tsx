import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure,
} from '@chakra-ui/react'
import EmployeesActions from './EmployeesActions'
import { useState } from 'react'
import UpdateEmployee from './forms/UpdateEmployee'
import DeleteEmployee from './forms/DeleteEmployee'
import { Employee } from '@/services/api/employees/types/employee'

type EmployeeLocal = {
    id: string
    name: string
}

type EmployeesTableProps = {
    employees: Employee[]
    isLoading: boolean
    errorOnLoadEmployees: Error | null
    orderBy: string
    setOrderBy: (orderBy: string) => void
    order: string
    setOrder: (order: string) => void
}

export default function EmployeesTable({
    employees,
    isLoading,
    errorOnLoadEmployees,
    orderBy,
    setOrderBy,
    order,
    setOrder,
}: EmployeesTableProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<{ employee: EmployeeLocal, action: 'update' | 'delete' } | null>(null)

    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure({
        defaultIsOpen: false,
        id: 'update-employee',
    })

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure({
        defaultIsOpen: false,
        id: 'delete-employee',
    })

    const handleAction = (employee: EmployeeLocal, action: 'update' | 'delete') => {
        setSelectedEmployee({ employee, action })
        if (action === 'update') {
            onOpenUpdate()
        } else {
            onOpenDelete()
        }
    }

    const handleSort = (column: string) => {
        if (orderBy === column) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(column);
            setOrder('asc');
        }
    };

    const renderSortIndicator = (column: string) => {
        if (orderBy === column) return order === 'asc' ? '⬆️' : '⬇️';
        return null;
    };

    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th onClick={() => handleSort('name')}>
                                Nome {renderSortIndicator('name')}
                            </Th>
                            <Th onClick={() => handleSort('role')}>
                                Cargo {renderSortIndicator('role')}
                            </Th>
                            <Th onClick={() => handleSort('department')}>
                                Departamento {renderSortIndicator('department')}
                            </Th>
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
                        {employees.map((employee) => (
                            <Tr key={employee.id}>
                                <Td>{employee.name}</Td>
                                <Td>{employee.role}</Td>
                                <Td>{employee.department}</Td>
                                <Td>
                                    <EmployeesActions
                                        onEdit={() => handleAction(employee, 'update')}
                                        onDelete={() => handleAction(employee, 'delete')}
                                    />
                                </Td>
                            </Tr>
                        ))}
                        {employees.length === 0 && !isLoading && !errorOnLoadEmployees && (
                            <Tr>
                                <Td colSpan={4}>Nenhum colaborador encontrado</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            {selectedEmployee?.action === 'update' && (
                <UpdateEmployee
                    employeeId={selectedEmployee.employee.id}
                    isOpen={isOpenUpdate}
                    onClose={() => {
                        onCloseUpdate()
                        setSelectedEmployee(null)
                    }}
                />
            )}
            {selectedEmployee?.action === 'delete' && (
                <DeleteEmployee
                    employee={selectedEmployee.employee}
                    isOpen={isOpenDelete}
                    onClose={() => {
                        onCloseDelete()
                        setSelectedEmployee(null)
                    }}
                />
            )}
        </>
    )
}