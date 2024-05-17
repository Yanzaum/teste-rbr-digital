'use client'
import { Button } from "@chakra-ui/react";
import EmployeesTable from "./components/EmployeesTable";
import { Plus } from '@phosphor-icons/react';

export default function EmployeesPage() {
    return (
        <main className="container mx-auto space-y-4 min-h-screen py-10">
            <div className="flex justify-end items-center">
                <Button leftIcon={<Plus />} colorScheme='teal' variant='solid'>
                    Adicionar
                </Button>
            </div>
            <EmployeesTable />
        </main>
    )
}