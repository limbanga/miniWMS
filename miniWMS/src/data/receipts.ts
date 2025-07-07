export type ReceiptStatus = "completed" | "processing" | "cancelled";

export interface Receipt {
  id: string;
  code: string;
  supplierName: string;
  totalItems: number;
  createdAt: string;
  status: ReceiptStatus;
}

export const sampleReceipts: Receipt[] = [
  {
    id: "r1",
    code: "PNK-20250701-01",
    supplierName: "Công ty TNHH ABC",
    totalItems: 15,
    createdAt: "2025-07-01T10:30:00Z",
    status: "completed",
  },
  {
    id: "r2", 
    code: "PNK-20250702-02",
    supplierName: "Công ty CP XYZ",
    totalItems: 8,
    createdAt: "2025-07-02T14:15:00Z",
    status: "processing",
  },
  {
    id: "r3",
    code: "PNK-20250703-03",
    supplierName: "Kho hàng tổng hợp",
    totalItems: 20,
    createdAt: "2025-07-03T09:45:00Z",
    status: "cancelled",
  },
];
