export interface Receipt {
  id: string;
  supplierId: string;
  receiptDate: string; // ISO format
  notes?: string;
}
