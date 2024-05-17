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
import { useMutation, useQuery } from "@tanstack/react-query";
import { employeeService } from "@/services/api/employees";
import { queryClient } from "@/app/providers";
import { useEffect } from "react";

const updateEmployeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    role: z.string().min(1, "Cargo é obrigatório"),
    department: z.string().min(1, "Departamento é obrigatório"),
    admissionDate: z.string().refine(val => !isNaN(Date.parse(val)), "Data de admissão inválida"),
});

type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;

type UpdateEmployeeProps = {
    employeeId: string;
    isOpen: boolean;
    onClose: () => void;
};

export default function UpdateEmployee({
    employeeId,
    isOpen,
    onClose,
}: UpdateEmployeeProps) {
    const toast = useToast()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateEmployeeFormData>({
        resolver: zodResolver(updateEmployeeSchema),
    });

    const {
        data: employee,
        isLoading: isLoadingEmployee,
        error: errorOnLoadEmployee,
    } = useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => employeeService.getEmployee(employeeId),
        enabled: isOpen,
    })

    useEffect(() => {
        if (employee) {
            setValue("name", employee.name);
            setValue("role", employee.role);
            setValue("department", employee.department);
            setValue("admissionDate", new Date(employee.admissionDate).toISOString().substring(0, 10));
        }
    }, [employee, setValue]);

    const {
        mutate: updateEmployee,
        isPending: isUpdatingEmployee,
    } = useMutation({
        mutationFn: (employee: UpdateEmployeeFormData) =>
            employeeService.updateEmployee(employeeId, {
                ...employee,
                admissionDate: new Date(employee.admissionDate)
            }),
    })

    const onSubmit = (data: UpdateEmployeeFormData) => {
        updateEmployee(data, {
            onSuccess: () => {
                onClose();
                toast({
                    title: 'Colaborador editado com sucesso',
                    status: 'success',
                })
                queryClient.invalidateQueries({
                    queryKey: ['employees'],
                })
            },
            onError: () => {
                toast({
                    title: 'Erro ao editar colaborador',
                    status: 'error',
                })
            }
        });
    };

    if (isLoadingEmployee) {
        return <div>Carregando...</div>
    }

    if (errorOnLoadEmployee) {
        return <div>Erro ao carregar colaborador</div>
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar colaborador - {employee?.name}</ModalHeader>
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
                            {...register("admissionDate")}
                        />
                        {errors.admissionDate && (
                            <span className='text-red-500 text-sm'>
                                {errors.admissionDate.message}
                            </span>
                        )}
                    </div>
                    <Button colorScheme="blue" type="submit" isLoading={isUpdatingEmployee}>Editar</Button>
                </div>
            </form>
        </ModalBody>
        </ModalContent>
      </Modal>
    )
}
