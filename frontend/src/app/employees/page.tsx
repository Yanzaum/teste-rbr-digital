'use client'
import { Button, Text } from "@chakra-ui/react";
import EmployeesTable from "./components/EmployeesTable";
import { Plus } from '@phosphor-icons/react';

export default function EmployeesPage() {
    return (
        <main className="container mx-auto space-y-4 min-h-screen py-10">
            <div className="flex justify-between items-center">
                <Text fontSize='2xl' fontWeight='bold'>Colaboradores</Text>
                <Button leftIcon={<Plus />} colorScheme='teal' variant='solid'>
                    Adicionar
                </Button>
            </div>
            <EmployeesTable />
        </main>
    )
}