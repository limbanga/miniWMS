import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sampleReceipts, type Receipt } from "@/data/receipts";
import type { ReceiptItem } from "@/data/receiptItem";
import AllocateDialog from "@/components/dialogs/AllocateDialog";

const sampleItems: ReceiptItem[] = [
    {
        id: "ri1",
        receiptId: "r1",
        productId: "P001",
        unitPrice: 1200000,
        totalQuantity: 10,
    },
    {
        id: "ri2",
        receiptId: "r1",
        productId: "P002",
        unitPrice: 800000,
        totalQuantity: 5,
    },
    {
        id: "ri3",
        receiptId: "r2",
        productId: "P003",
        unitPrice: 1500000,
        totalQuantity: 8,
    },
];
const warehouseData = [
    {
        id: "w1",
        name: "Kho A",
        zones: [
            {
                id: "z1",
                name: "Khu A1",
                shelves: [
                    {
                        id: "s1",
                        name: "Kệ A1-1",
                        shelfLevels: [
                            { id: "sl1", name: "Tầng 1" },
                            { id: "sl2", name: "Tầng 2" },
                        ],
                    },
                ],
            },
        ],
    },
];



// Hàm hiển thị trạng thái
const getStatusBadge = (status: Receipt["status"]) => {
    switch (status) {
        case "completed":
            return <Badge className="bg-green-100 text-green-800">Hoàn tất</Badge>;
        case "processing":
            return <Badge className="bg-yellow-100 text-yellow-800">Đang xử lý</Badge>;
        case "cancelled":
            return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

export default function ReceiptDetail() {
    const { id } = useParams();
    const [receipt, setReceipt] = useState<Receipt | null>(null);
    const [items, setItems] = useState<ReceiptItem[]>([]);

    const [showDialog, setShowDialog] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        const foundReceipt = sampleReceipts.find((r) => r.id === id);
        const relatedItems = sampleItems.filter((item) => item.receiptId === id);
        setReceipt(foundReceipt || null);
        setItems(relatedItems);
    }, [id]);

    if (!receipt) return <p>Không tìm thấy phiếu nhập.</p>;

    const handleAllocate = (itemId: string) => {
        alert(`Phân bổ hàng cho item ID: ${itemId}`);
        // Logic mở modal hoặc chuyển trang để phân bổ vào kho
    };

    // TODO: sửa lại cho đẹp hơn, hiện tại chỉ là mẫu
    return (
        <>

            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Chi tiết Phiếu nhập #{receipt.code}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Nhà cung cấp:</strong> {receipt.supplierName}</p>
                        <p><strong>Ngày tạo:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
                        <p><strong>Số lượng mặt hàng:</strong> {receipt.totalItems}</p>
                        <p><strong>Trạng thái:</strong> {getStatusBadge(receipt.status)}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách sản phẩm</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mã sản phẩm</TableHead>
                                    <TableHead>Đơn giá</TableHead>
                                    <TableHead>Số lượng</TableHead>
                                    <TableHead>Thành tiền</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.productId}</TableCell>
                                        <TableCell>{item.unitPrice.toLocaleString()} đ</TableCell>
                                        <TableCell>{item.totalQuantity}</TableCell>
                                        <TableCell>{(item.unitPrice * item.totalQuantity).toLocaleString()} đ</TableCell>
                                        <TableCell className="text-right">
                                            <Button onClick={() => {
                                                setSelectedItemId(item.id);
                                                setShowDialog(true);
                                            }}>Phân bổ</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <AllocateDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                receiptItemId={selectedItemId!}
                onSubmit={(allocation) => {
                    console.log("Phân bổ:", allocation);
                    // TODO: save to state/API
                }}
                data={
                    warehouseData
                }
            />
        </>
    );
}
