import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Download,
  TagIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { sampleTags, type Tag } from "@/data/tags";
import { PageBreadcrumb } from "@/components/breadcrumbs/page-breadcrumb";
import TagTable from "../../../components/tables/TagTable";

export default function TagCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tags] = useState<Tag[]>(sampleTags);

  const filteredTags = tags.filter((tag) =>
    [tag.name, tag.description]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="mb-4">
            <PageBreadcrumb
              items={[
                { label: "Trang chủ", href: "/app" },
                { label: "Tag", isCurrent: true }
              ]}
            />
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <TagIcon className="w-8 h-8 mr-3 text-primary" />
            Danh mục Tag
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý và theo dõi tất cả tag đang sử dụng
          </p>
        </div>
        <Link to="/app/tags/add">
          <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Thêm tag
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="py-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách tag ({filteredTags.length} kết quả)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <TagTable filteredTags={filteredTags} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
