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
import { useQuery } from '@tanstack/react-query'
import { employeeService } from '@/services/api/employees'
import { useState } from 'react'
import UpdateEmployee from './forms/UpdateEmployee'
import DeleteEmployee from './forms/DeleteEmployee'

type Employee = {
    id: string
    name: string
}

export default function EmployeesTable() {
    const [selectedEmployee, setSelectedEmployee] = useState<{ employee: Employee, action: 'update' | 'delete' } | null>(null)

    const {
        data: employees,
        isLoading,
        error: errorOnLoadEmployees,
    } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeService.getEmployees,
    })

    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure({
        defaultIsOpen: false,
        id: 'update-employee',
    })

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure({
        defaultIsOpen: false,
        id: 'delete-employee',
    })

    const handleAction = (employee: Employee, action: 'update' | 'delete') => {
        setSelectedEmployee({ employee, action })
        if (action === 'update') {
            onOpenUpdate()
        } else {
            onOpenDelete()
        }
    }

    return (
        <>
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
                                    <EmployeesActions
                                        onEdit={() => handleAction(employee, 'update')}
                                        onDelete={() => handleAction(employee, 'delete')}
                                    />
                                </Td>
                            </Tr>
                        ))}
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