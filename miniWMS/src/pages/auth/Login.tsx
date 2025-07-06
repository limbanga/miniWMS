import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn,
  Warehouse,
  Shield,
  User,
  Lock,
  CheckCircle,
  ArrowRight,
  Github,
  Mail,
  Phone,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-fill demo credentials on load
  useEffect(() => {
    const savedCredentials = localStorage.getItem("savedCredentials");
    if (savedCredentials) {
      const parsed = JSON.parse(savedCredentials);
      setFormData({ ...formData, ...parsed });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Simulate authentication with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo credentials with enhanced validation
      const validCredentials = [
        {
          username: "admin",
          password: "admin123",
          role: "admin",
          name: "Quản trị viên",
          permissions: ["all"],
        },
        {
          username: "staff",
          password: "staff123",
          role: "staff",
          name: "Nhân viên kho",
          permissions: ["warehouse", "inventory"],
        },
        {
          username: "manager",
          password: "manager123",
          role: "manager",
          name: "Quản lý kho",
          permissions: ["warehouse", "inventory", "reports"],
        },
        {
          username: "demo",
          password: "demo123",
          role: "viewer",
          name: "Tài khoản Demo",
          permissions: ["view"],
        },
      ];

      const user = validCredentials.find(
        (cred) =>
          cred.username === formData.username &&
          cred.password === formData.password,
      );

      if (user) {
        // Save user info
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: user.username,
            role: user.role,
            name: user.name,
            permissions: user.permissions,
            loginTime: new Date().toISOString(),
          }),
        );

        // Save credentials if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem(
            "savedCredentials",
            JSON.stringify({
              username: formData.username,
              rememberMe: true,
            }),
          );
        } else {
          localStorage.removeItem("savedCredentials");
        }

        setSuccess("Đăng nh��p thành công!");

        // Redirect based on role
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/warehouse");
          } else if (user.role === "manager") {
            navigate("/dashboard");
          } else {
            navigate("/products");
          }
        }, 1000);
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (username: string, password: string) => {
    setFormData({ ...formData, username, password });
  };

  const demoAccounts = [
    {
      username: "admin",
      password: "admin123",
      role: "Admin",
      description: "Toàn quyền hệ thống",
      color: "bg-red-100 text-red-800",
    },
    {
      username: "manager",
      password: "manager123",
      role: "Manager",
      description: "Quản lý kho & báo cáo",
      color: "bg-blue-100 text-blue-800",
    },
    {
      username: "staff",
      password: "staff123",
      role: "Staff",
      description: "Nhân viên kho",
      color: "bg-green-100 text-green-800",
    },
    {
      username: "demo",
      password: "demo123",
      role: "Viewer",
      description: "Chỉ xem",
      color: "bg-gray-100 text-gray-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding & Info */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Warehouse className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MiniWMS
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-md">
              Hệ thống quản lý kho thông minh với công nghệ hiện đại
            </p>
          </div>

          <div className="hidden lg:block space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Quản lý thông minh
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tự động hóa quy trình kho hàng
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">B��o mật cao</h3>
                  <p className="text-sm text-gray-600">
                    Phân quyền chi tiết và audit log
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Theo dõi realtime
                  </h3>
                  <p className="text-sm text-gray-600">
                    Monitoring và alerts tức thời
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Đăng nhập hệ thống
            </CardTitle>
            <p className="text-gray-600">Nhập thông tin để truy cập MiniWMS</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg animate-in fade-in duration-300">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg animate-in fade-in duration-300">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="flex items-center text-gray-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Tên đăng nhập
                </Label>
                <Input
                  id="username"
                  placeholder="Nhập tên đăng nhập"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="flex items-center text-gray-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="h-11 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        rememberMe: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Quên mật khẩu?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Đăng nhập
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-3 text-sm text-gray-500">
                  Tài khoản demo
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.username}
                    type="button"
                    onClick={() =>
                      fillDemoCredentials(account.username, account.password)
                    }
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={account.color}>
                        {account.role}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {account.username}
                        </p>
                        <p className="text-xs text-gray-600">
                          {account.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Cần hỗ trợ?
                <Link
                  to="/contact"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Liên hệ chúng tôi
                </Link>
              </p>
              <div className="flex justify-center space-x-4 text-gray-400">
                <Mail className="w-4 h-4" />
                <Phone className="w-4 h-4" />
                <Github className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
