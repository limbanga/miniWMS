import { CONTACT_PAGE_DATA as data } from "@/constants/contact";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

const iconMap = {
  phone: Phone,
  mail: Mail,
  map: MapPin,
  clock: Clock,
};

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {data.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{data.form.title}</CardTitle>
            <p className="text-muted-foreground">{data.form.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Họ *</Label>
                <Input id="firstName" placeholder="Nhập họ của bạn" />
              </div>
              <div>
                <Label htmlFor="lastName">Tên *</Label>
                <Input id="lastName" placeholder="Nhập tên của bạn" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="email@congty.com" />
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input id="phone" placeholder="0123 456 789" />
            </div>

            <div>
              <Label htmlFor="company">Tên công ty *</Label>
              <Input id="company" placeholder="Tên công ty của bạn" />
            </div>

            <div>
              <Label htmlFor="position">Chức vụ</Label>
              <Input id="position" placeholder="Giám đốc, Quản lý kho..." />
            </div>

            <div>
              <Label htmlFor="warehouseSize">Quy mô kho (m²)</Label>
              <Input id="warehouseSize" placeholder="VD: 1000" />
            </div>

            <div>
              <Label htmlFor="message">Yêu cầu cụ thể</Label>
              <Textarea
                id="message"
                placeholder="Chia sẻ về nhu cầu và thách thức hiện tại của kho hàng..."
                rows={4}
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              {data.form.submitText}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              {data.form.note}
            </p>
          </CardContent>
        </Card>

        {/* Contact Info + Benefits */}
        <div className="space-y-8">
          {/* Contact Info */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">
                {data.contactInfo.title}
              </h3>
              <div className="space-y-4">
                {data.contactInfo.items.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={item.label}
                      className="flex items-center space-x-3"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">
                {data.benefits.title}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {data.benefits.items.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
