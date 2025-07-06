import { z } from "zod";

export const warehouseSchema = z.object({
    name: z.string().min(2, "Tên kho tối thiểu 2 ký tự"),
    code: z.string().min(2, "Mã kho tối thiểu 2 ký tự"),
    location: z.string().min(2, "Vị trí không được để trống"),
    status: z.enum(["active", "inactive"]),
    notes: z.string().optional(),
    area: z.string().optional(),
    type: z.enum(["cold", "dry", "chemical"]),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
