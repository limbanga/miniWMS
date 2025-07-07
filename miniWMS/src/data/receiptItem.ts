// Phiếu nhập nào chứa sản phẩm gì
export interface ReceiptItem {
  id: string; // Khóa chính
  receiptId: string; // FK đến phiếu nhập
  productId: string; // FK đến sản phẩm
  unitPrice: number;
  totalQuantity: number;
}
