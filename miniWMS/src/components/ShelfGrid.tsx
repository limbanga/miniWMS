import { cn } from "@/lib/utils";
import clsx from "clsx";

const shelves = [
    {
        id: 1,
        name: "Kệ A1",
        capacity: 100,
        levels: 3,
    },
    {
        id: 2,
        name: "Kệ A2",
        capacity: 200,
        levels: 3,
    },
    {
        id: 3,
        name: "Kệ A3",
        capacity: 150,
        levels: 3,
    },
    {
        id: 4,
        name: "Kệ B1",
        capacity: 120,
        levels: 2,
    },
    {
        id: 5,
        name: "Kệ B2",
        capacity: 180,
        levels: 4,
    },
    {
        id: 6,
        name: "Kệ B3",
        capacity: 160,
        levels: 2,
    },
    {
        id: 7,
        name: "Kệ C1",
        capacity: 140,
        levels: 3,
    },
    {
        id: 8,
        name: "Kệ C2",
        capacity: 100,
        levels: 2,
    },
];

export function ShelfGrid() {
  const maxLevels = Math.max(...shelves.map((s) => s.levels));
  const shelfCount = shelves.length;

  return (
    <div className="space-y-4">
      {/* Header: Tên kệ */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${shelfCount}, minmax(0, 1fr))` }}
      >
        {shelves.map((shelf) => (
          <div
            key={shelf.id}
            className="text-center font-semibold text-primary"
          >
            {shelf.name}
          </div>
        ))}
      </div>

      {/* Rows: Các tầng */}
      {Array.from({ length: maxLevels }).map((_, levelIdx) => (
        <div
          key={levelIdx}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${shelfCount}, minmax(0, 1fr))` }}
        >
          {shelves.map((shelf) => (
            <div
              key={`${shelf.id}-${levelIdx}`}
              className={cn(
                "border rounded-md py-3 text-center text-sm",
                shelf.levels > levelIdx
                  ? "bg-muted"
                  : "bg-gray-100 text-gray-400 line-through"
              )}
            >
              {shelf.levels > levelIdx ? `Tầng ${levelIdx + 1}` : "Không có"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
