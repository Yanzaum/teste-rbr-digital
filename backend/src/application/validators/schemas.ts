import { z } from "zod";

export const getEmployeeSchemaParams = z.object({
    id: z.string().min(1, "ID is required"),
});

export const createEmployeeSchemaBody = z.object({
  name: z.string().min(1, "Name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  admissionDate: z.string().transform((str) => new Date(str)),
});

export const updateEmployeeSchemaParams = z.object({
    id: z.string().min(1, "ID is required"),
});

export const updateEmployeeSchemaBody = z.object({
  name: z.string().min(1, "Name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  admissionDate: z.string().transform((str) => new Date(str)),
});

export const deleteEmployeeSchemaParams = z.object({
    id: z.string().min(1, "ID is required"),
});