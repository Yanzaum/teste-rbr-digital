import { Button } from "@chakra-ui/react";
import { PencilSimple, Trash } from "@phosphor-icons/react";

type EmployeesActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
};

export default function EmployeesActions({
    onEdit,
    onDelete,
}: EmployeesActionsProps) {
    return (
        <div className='flex gap-2'>
            <Button size='sm' colorScheme='blue' onClick={onEdit}>
                <PencilSimple />
            </Button>
            <Button size='sm' colorScheme='red' onClick={onDelete}>
                <Trash />
            </Button>
        </div>
    )
}