import { Button, Input, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useMutation } from "@tanstack/react-query";
import { employeeService } from "@/services/api/employees";
import { queryClient } from "@/app/providers";

const createEmployeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    role: z.string().min(1, "Cargo é obrigatório"),
    department: z.string().min(1, "Departamento é obrigatório"),
    admissionDate: z.date(),
});

type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;

type CreateEmployeeProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CreateEmployee({
    isOpen,
    onClose,
}: CreateEmployeeProps) {
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateEmployeeFormData>({
        resolver: zodResolver(createEmployeeSchema),
    });

    const {
        mutate: createEmployee,
        isPending: isCreatingEmployee,
    } = useMutation({
        mutationFn: employeeService.createEmployee,
    })

    const onSubmit = (data: CreateEmployeeFormData) => {
        createEmployee(data, {
            onSuccess: () => {
                onClose();
                toast({
                    title: 'Colaborador criado com sucesso',
                    status: 'success',
                })
                queryClient.invalidateQueries({
                    queryKey: ['employees'],
                })
            },
            onError: () => {
                toast({
                    title: 'Erro ao criar colaborador',
                    status: 'error',
                })
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar colaborador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name">Nome</label>
                        <Input
                            placeholder='Informe o nome do colaborador'
                            size='sm'
                            isInvalid={!!errors.name}
                            errorBorderColor='red.300'
                            {...register("name")}
                        />
                        {errors.name && (
                            <span className='text-red-500 text-sm'>
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="role">Cargo</label>
                        <Input
                            placeholder='Informe o cargo do colaborador'
                            size='sm'
                            isInvalid={!!errors.role}
                            errorBorderColor='red.300'
                            {...register("role")}
                        />
                        {errors.role && (
                            <span className='text-red-500 text-sm'>
                                {errors.role.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="department">Departamento</label>
                        <Input
                            placeholder='Informe o departamento do colaborador'
                            size='sm'
                            isInvalid={!!errors.department}
                            errorBorderColor='red.300'
                            {...register("department")}
                        />
                        {errors.department && (
                            <span className='text-red-500 text-sm'>
                                {errors.department.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="admissionDate">Data de admissão</label>
                        <Input
                            placeholder='Informe a data de admissão do colaborador'
                            size='sm'
                            type="date"
                            isInvalid={!!errors.admissionDate}
                            errorBorderColor='red.300'
                            {...register("admissionDate", {
                                valueAsDate: true
                            })}
                        />
                        {errors.admissionDate && (
                            <span className='text-red-500 text-sm'>
                                {errors.admissionDate.message}
                            </span>
                        )}
                    </div>
                    <Button type="submit" isLoading={isCreatingEmployee}>
                        Salvar
                    </Button>
                </div>
            </form>
        </ModalBody>
        </ModalContent>
      </Modal>
    )
}
