'use client'
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import EmployeesTable from "./components/EmployeesTable";
import { Plus } from '@phosphor-icons/react';
import CreateEmployee from "./components/forms/CreateEmployee";

export default function EmployeesPage() {
    const { isOpen: isOpenCreate, onClose: onCloseCreate, onToggle: onToggleCreate } = useDisclosure({
        defaultIsOpen: false,
        id: 'create-employee',
    })

    return (
        <main className="container mx-auto space-y-4 min-h-screen py-10">
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
            <EmployeesTable />
            <CreateEmployee isOpen={isOpenCreate} onClose={onCloseCreate} />
        </main>
    )
}