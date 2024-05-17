'use client'
import { Button, Input, InputGroup, InputLeftElement, Text, useDisclosure } from "@chakra-ui/react";
import EmployeesTable from "./components/EmployeesTable";
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import CreateEmployee from "./components/forms/CreateEmployee";
import { useQuery } from "@tanstack/react-query";
import { employeeService } from "@/services/api/employees";
import { useState } from "react";

export default function EmployeesPage() {
    const [search, setSearch] = useState<string>('')
    const [displaySearch, setDisplaySearch] = useState<string>('')
    const [orderBy, setOrderBy] = useState<string>('')
    const [order, setOrder] = useState<string>('')

    const { isOpen: isOpenCreate, onClose: onCloseCreate, onToggle: onToggleCreate } = useDisclosure({
        defaultIsOpen: false,
        id: 'create-employee',
    })

    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplaySearch(e.target.value)
        if (typingTimeout) {
            clearTimeout(typingTimeout)
        }
        setTypingTimeout(setTimeout(() => {
            setSearch(e.target.value)
        }, 1000))
    }

    const {
        data: employees = [],
        isLoading,
        error: errorOnLoadEmployees,
    } = useQuery({
        queryKey: ['employees', search, orderBy, order],
        queryFn: () => employeeService.getEmployees(search, orderBy, order),
    })

    return (
        <main className="container md:mx-auto space-y-4 min-h-screen md:py-10 p-4">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Text fontSize='2xl' fontWeight='bold'>Colaboradores</Text>
                    <Button
                        type="button"
                        leftIcon={<Plus />}
                        colorScheme='teal'
                        variant='solid'
                        onClick={onToggleCreate}
                    >
                        Adicionar
                    </Button>
                </div>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <MagnifyingGlass />
                    </InputLeftElement>
                    <Input
                        type='text'
                        placeholder='Pesquise pelo nome do colaborador'
                        className="max-w-lg"
                        value={displaySearch}
                        onChange={handleSearchChange}
                    />
                </InputGroup>
            </div>
            <EmployeesTable
                employees={employees}
                isLoading={isLoading}
                errorOnLoadEmployees={errorOnLoadEmployees}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                order={order}
                setOrder={setOrder}
            />
            <CreateEmployee isOpen={isOpenCreate} onClose={onCloseCreate} />
        </main>
    )
}