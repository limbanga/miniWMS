import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ShelfLevel } from "@/data/types";
import ShelfLevelCard from "./cards/ShelfLevelCard";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

const shelves = [
  {
    id: "shelf-1",
    name: "Kệ A1",
    levels: [
      {
        id: "level-1-1",
        shelfId: "shelf-1",
        levelNumber: 1,
        capacity: 100,
        currentStock: 60,
        status: "active",
        productName: "Sản phẩm A",
      },
      {
        id: "level-1-2",
        shelfId: "shelf-1",
        levelNumber: 2,
        capacity: 100,
        currentStock: 20,
        status: "maintenance",
        productName: "Sản phẩm B",
      },
      {
        id: "level-1-3",
        shelfId: "shelf-1",
        levelNumber: 3,
        capacity: 100,
        currentStock: 0,
        status: "inactive",
        productName: "Sản phẩm C",
      },
    ] satisfies ShelfLevel[],
  },
  {
    id: "shelf-2",
    name: "Kệ A2",
    levels: [
      {
        id: "level-2-1",
        shelfId: "shelf-2",
        levelNumber: 1,
        capacity: 80,
        currentStock: 40,
        status: "active",
      },
      {
        id: "level-2-2",
        shelfId: "shelf-2",
        levelNumber: 2,
        capacity: 80,
        currentStock: 60,
        status: "active",
      },
    ] satisfies ShelfLevel[],
  },
  {
    id: "shelf-3",
    name: "Kệ A3",
    levels: [
      {
        id: "level-3-1",
        shelfId: "shelf-3",
        levelNumber: 1,
        capacity: 120,
        currentStock: 90,
        status: "active",
      },
    ] satisfies ShelfLevel[],
  },
];

export function ShelfGrid() {
  return (
    <Tabs defaultValue={shelves[0].id} className="space-y-4">
      <TabsList className="flex flex-wrap gap-2">
        {shelves.map((shelf) => (
          <TabsTrigger key={shelf.id} value={shelf.id}>
            {shelf.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {shelves.map((shelf) => (
        <TabsContent key={shelf.id} value={shelf.id}>
          {/* Tổng quan kệ */}
          <div className="mb-4 border rounded-md p-4 bg-muted/40">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{shelf.name}</h2>
              <Button
                size="sm"
                onClick={() => alert(`Thêm tầng mới cho ${shelf.name}`)}
                title="Thêm tầng mới"
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Thêm tầng mới
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tổng số tầng</p>
                <p className="font-medium">{shelf.levels.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sức chứa tối đa</p>
                <p className="font-medium">
                  {shelf.levels.reduce((acc, lv) => acc + lv.capacity, 0)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Đã sử dụng</p>
                <p className="font-medium">
                  {shelf.levels.reduce((acc, lv) => acc + lv.currentStock, 0)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Còn trống</p>
                <p className="font-medium">
                  {shelf.levels.reduce((acc, lv) => acc + lv.capacity - lv.currentStock, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Danh sách tầng */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {shelf.levels
              .sort((a, b) => a.levelNumber - b.levelNumber)
              .map((level) => (
                <ShelfLevelCard key={level.id} level={level} />
              ))}
          </div>
        </TabsContent>

      ))}
    </Tabs>
  );
}
