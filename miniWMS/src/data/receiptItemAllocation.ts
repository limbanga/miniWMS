// Allocation được tách ra bảng riêng có 2 khóa ngoại
export interface ReceiptItemAllocation {
  id: string; // Khóa chính
  receiptItemId: string; // FK đến ReceiptItem
  shelfLevelId: string;   // FK đến shelfLevelId
  quantity: number; // Số lượng phân bổ
}
