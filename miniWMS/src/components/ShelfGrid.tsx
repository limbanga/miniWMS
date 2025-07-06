import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ShelfLevel } from "@/data/types";
import ShelfLevelCard from "./cards/ShelfLevelCard";

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
      },
      {
        id: "level-1-2",
        shelfId: "shelf-1",
        levelNumber: 2,
        capacity: 100,
        currentStock: 20,
        status: "maintenance",
      },
      {
        id: "level-1-3",
        shelfId: "shelf-1",
        levelNumber: 3,
        capacity: 100,
        currentStock: 0,
        status: "inactive",
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
