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
import { useMemo } from "react";

const deleteEmployeeSchema = (employeeName: string) =>
    z.object({
      confirm: z
        .string()
        .min(1, 'Confirme antes de prosseguir.')
        .refine((confirm) => confirm === employeeName, 'Escreva corretamente o nome do colaborador.'),
    });

type DeleteEmployeeProps = {
    employee: {
        id: string;
        name: string;
    };
    isOpen: boolean;
    onClose: () => void;
};

export default function DeleteEmployee({
    employee: {
        id,
        name,
    },
    isOpen,
    onClose,
}: DeleteEmployeeProps) {
    const toast = useToast()

    const DeleteEmployeeSchema = useMemo(() => deleteEmployeeSchema(name), [name]);
    type DeleteEmployeeFormData = z.infer<typeof DeleteEmployeeSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<DeleteEmployeeFormData>({
        resolver: zodResolver(DeleteEmployeeSchema),
    });

    const {
        mutate: deleteEmployee,
        isPending: isDeletingEmployee,
    } = useMutation({
        mutationFn: (employee: DeleteEmployeeFormData) => employeeService.deleteEmployee(id),
    })

    const onSubmit = (data: DeleteEmployeeFormData) => {
        deleteEmployee(data, {
            onSuccess: () => {
                onClose();
                toast({
                    title: 'Colaborador deletado com sucesso',
                    status: 'success',
                })
                queryClient.invalidateQueries({
                    queryKey: ['employees'],
                })
            },
            onError: () => {
                toast({
                    title: 'Erro ao deletar colaborador',
                    status: 'error',
                })
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar colaborador - {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name">
                            Escreva <strong className="italic">{name}</strong> para confirmar.
                        </label>
                        <Input
                            placeholder='Informe o nome do colaborador'
                            size='sm'
                            isInvalid={!!errors.confirm}
                            errorBorderColor='red.300'
                            {...register("confirm")}
                        />
                        {errors.confirm && (
                            <span className='text-red-500 text-sm'>
                                {errors.confirm.message}
                            </span>
                        )}
                    </div>
                    <Button
                        colorScheme="red"
                        type="submit"
                        isLoading={isDeletingEmployee}
                        isDisabled={!isValid}
                    >
                        Deletar
                    </Button>
                </div>
            </form>
        </ModalBody>
        </ModalContent>
      </Modal>
    )
}
