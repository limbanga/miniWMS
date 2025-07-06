import { useState } from "react";
import { FolderOpen, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "@/components/dialogs/CategoryDialog";
import type { Category } from "@/data/types";
import { FilterBar } from "@/components/FilterBar";
import { CategoryTable } from "@/components/tables/CategoryTable";
import { predefinedColors, sampleCategories } from "@/data/categories";
import { StatsCard } from "@/components/cards/StatsCard";

export default function Categories() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState<Category[]>(sampleCategories);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    const colors = predefinedColors;
    const filtered = categories.filter(c => c.name.toLowerCase().includes(searchTerm) || c.description.toLowerCase().includes(searchTerm));

    const handleSave = (data: { name: string; description: string; color: string; }) => {
        if (editing) {
            setCategories(prev => prev.map(c => c.id === editing.id ? { ...c, ...data, updatedAt: new Date().toISOString().split("T")[0] } : c));
        } else {
            const newCat: Category = { id: String(categories.length + 1), productCount: 0, status: "active", createdAt: new Date().toISOString().split("T")[0], updatedAt: new Date().toISOString().split("T")[0], ...data };
            setCategories(prev => [...prev, newCat]);
        }
        setDialogOpen(false);
        setEditing(null);
    };

    const handleEdit = (cat: Category) => { setEditing(cat); setDialogOpen(true); };
    const handleDelete = (id: string) => { if (confirm("...")) setCategories(prev => prev.filter(c => c.id !== id)); };
    const handleToggle = (id: string) => { setCategories(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active", updatedAt: new Date().toISOString().split("T")[0] } : c)); };

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header & Add */}
            <div className="flex justify-between mb-8">
                <h1 className="text-3xl font-bold flex items-center"><FolderOpen className="mr-3" />Quản lý Danh mục</h1>
                <Button onClick={() => { setEditing(null); setDialogOpen(true); }}><Plus className="mr-2" />Thêm danh mục</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    label="Tổng danh mục"
                    value={categories.length}
                    icon={<Package className="w-8 h-8 text-primary" />}
                />
                <StatsCard
                    label="Đang hoạt động"
                    value={categories.filter((c) => c.status === "active").length}
                    color="text-green-600"
                    icon={
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-600 rounded-full" />
                        </div>
                    }
                />
                <StatsCard
                    label="Không hoạt động"
                    value={categories.filter((c) => c.status === "inactive").length}
                    color="text-red-600"
                    icon={
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full" />
                        </div>
                    }
                />
                <StatsCard
                    label="Tổng sản phẩm"
                    value={categories.reduce((sum, c) => sum + c.productCount, 0)}
                    icon={
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full" />
                        </div>
                    }
                />
            </div>

            <FilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <CategoryTable categories={filtered} onEdit={handleEdit} onToggleStatus={handleToggle} onDelete={handleDelete} />
            <CategoryDialog open={dialogOpen} initialData={editing || { name: "", description: "", color: colors[0] }} colors={colors} onSave={handleSave} onClose={() => setDialogOpen(false)} />
        </div >
    );
}
