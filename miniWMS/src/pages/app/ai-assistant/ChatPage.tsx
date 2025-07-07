import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bot,
  User,
  Send,
  Paperclip,
  Mic,
  Trash2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Settings,
  Moon,
  Sun,
  Zap,
  CheckCircle,
  MessageSquare,
  FileText,
  Code,
  Package,
  BarChart3,
  Users,
  MapPin,
  Shield,
  HelpCircle,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
  attachments?: Attachment[];
  suggestions?: string[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [showSettings, setShowSettings] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample conversations
  useEffect(() => {
    const sampleConversations: Conversation[] = [
      {
        id: "1",
        title: "Hướng dẫn sử dụng MiniWMS",
        lastMessage: "Làm thế nào để thêm sản phẩm mới?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        messages: [
          {
            id: "1-1",
            type: "user",
            content: "Làm thế nào để thêm sản phẩm mới vào hệ thống?",
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: "sent",
          },
          {
            id: "1-2",
            type: "assistant",
            content:
              "Để thêm sản phẩm mới vào MiniWMS, bạn có thể làm theo các bước sau:\n\n1. Truy cập trang **Sản phẩm** từ menu sidebar\n2. Nhấp vào nút **Thêm sản phẩm**\n3. Điền thông tin sản phẩm:\n   - Tên sản phẩm\n   - Mã SKU\n   - Danh mục\n   - Giá bán\n   - Mô tả\n4. Nhấp **Lưu** để hoàn tất\n\nBạn cũng có thể thêm hình ảnh và thiết lập vị trí lưu trữ trong quá trình tạo sản phẩm.",
            timestamp: new Date(Date.now() - 1000 * 60 * 29),
            status: "sent",
            suggestions: [
              "Cách quản lý kho?",
              "Hướng dẫn nhập hàng",
              "Thiết lập vị trí lưu trữ",
            ],
          },
        ],
      },
      {
        id: "2",
        title: "Quản lý kho hàng",
        lastMessage: "Tôi có thể giám sát nhiệt độ kho như thế nào?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        messages: [],
      },
    ];

    setConversations(sampleConversations);
    setCurrentConversation("1");
    setMessages(sampleConversations[0].messages);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const aiPersonalities = [
    {
      id: "gpt-4",
      name: "GPT-4 Turbo",
      description: "Model thông minh nhất, phù hợp cho các câu hỏi phức tạp",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      id: "claude",
      name: "Claude 3",
      description: "Chuyên về phân tích và viết lách",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: "warehouse-expert",
      name: "Warehouse Expert",
      description: "Chuyên gia về quản lý kho và logistics",
      icon: Package,
      color: "text-green-600",
    },
    {
      id: "code-assistant",
      name: "Code Assistant",
      description: "Hỗ trợ lập trình và kỹ thuật",
      icon: Code,
      color: "text-orange-600",
    },
  ];

  const quickActions = [
    {
      icon: Package,
      label: "Quản lý sản phẩm",
      prompt: "Hướng dẫn tôi cách quản lý sản phẩm hiệu quả",
    },
    {
      icon: BarChart3,
      label: "Phân tích dữ liệu",
      prompt: "Giúp tôi hiểu các báo cáo và thống kê trong hệ thống",
    },
    {
      icon: MapPin,
      label: "Vị trí kho",
      prompt: "Cách tối ưu hóa vị trí lưu trữ trong kho",
    },
    {
      icon: Users,
      label: "Quản lý nhân viên",
      prompt: "Hướng dẫn phân quyền và quản lý người dùng",
    },
    {
      icon: Shield,
      label: "Bảo mật",
      prompt: "Các biện pháp bảo mật dữ liệu kho hàng",
    },
    {
      icon: HelpCircle,
      label: "Trợ giúp chung",
      prompt: "Tôi cần hỗ trợ sử dụng MiniWMS",
    },
  ];

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 2000),
    );

    // Generate contextual responses based on keywords
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("sản phẩm") || lowerMessage.includes("product")) {
      return `Về quản lý sản phẩm trong MiniWMS:

**Tính năng chính:**
- ✅ Thêm/sửa/xóa sản phẩm
- ✅ Quản lý SKU và mã vạch
- ✅ Phân loại theo danh mục
- ✅ Tracking tồn kho theo thời gian thực
- ✅ Thiết lập giá và khuyến mãi

**Workflow đề xuất:**
1. **Tạo danh mục** trước khi thêm sản phẩm
2. **Thiết lập vị trí kho** phù hợp
3. **Import sản phẩm** từ file Excel (nếu có nhiều)
4. **Gán nhà cung cấp** cho từng sản phẩm

Bạn có cần hướng dẫn chi tiết cho bước nào cụ thể không?`;
    }

    if (lowerMessage.includes("kho") || lowerMessage.includes("warehouse")) {
      return `Hệ thống quản lý kho MiniWMS cung cấp:

**🏢 Quản lý vị trí:**
- Cấu trúc Zone → Shelf → Level
- Mapping 3D warehouse layout
- Capacity tracking v�� optimization

**📊 Monitoring realtime:**
- Nhiệt độ, độ ẩm từng zone
- Alert system tự động
- Activity logging chi tiết

**🚛 Logistics:**
- FIFO/LIFO inventory rotation
- Pick path optimization
- Shipping integration

**📈 Analytics:**
- Utilization reports
- Performance metrics
- Predictive insights

Bạn muốn tìm hiểu sâu hơn về module nào?`;
    }

    if (lowerMessage.includes("báo cáo") || lowerMessage.includes("report")) {
      return `MiniWMS cung cấp các báo cáo sau:

**📊 Báo cáo tồn kho:**
- Stock levels theo thời gian thực
- ABC analysis
- Slow-moving inventory
- Stock valuation

**📈 Báo cáo hoạt động:**
- In/Out transactions
- Pick/Pack efficiency
- Labor productivity
- Equipment utilization

**💰 Báo cáo tài chính:**
- Inventory turnover
- Carrying costs
- ROI analysis
- Cost per transaction

**🎯 Custom reports:**
- Dashboard builder
- Scheduled reports
- Export formats (PDF, Excel, CSV)

Bạn cần thiết lập báo cáo nào cụ thể?`;
    }

    if (
      lowerMessage.includes("lỗi") ||
      lowerMessage.includes("error") ||
      lowerMessage.includes("sự cố")
    ) {
      return `Để khắc phục sự cố trong MiniWMS:

**🔧 Các bước chuẩn đoán:**
1. **Kiểm tra kết nối** - Network connectivity
2. **Browser cache** - Clear cache và cookies
3. **User permissions** - Verify access rights
4. **System status** - Check service health

**📞 Hỗ trợ kỹ thuật:**
- **Email:** support@miniwms.com
- **Hotline:** 1900-xxxx
- **Live chat:** Trong giờ hành chính
- **Remote support:** Có thể sắp xếp

**📝 Khi báo cáo lỗi, vui lòng cung cấp:**
- Error message cụ thể
- Screenshots/screen recording
- Steps to reproduce
- Browser và OS version

Bạn đang gặp vấn đề gì cụ thể?`;
    }

    // Default responses
    const defaultResponses = [
      `Cảm ơn bạn đã sử dụng MiniWMS! Tôi có thể hỗ trợ bạn về:

- 📦 **Quản lý sản phẩm** và inventory
- 🏢 **Quản lý kho** và vị trí lưu trữ  
- 📊 **Báo cáo** và analytics
- 👥 **Quản lý người dùng** và phân quyền
- 🔧 **Khắc phục sự cố** kỹ thuật
- ⚙️ **Cấu hình** và tùy chỉnh hệ thống

Bạn muốn tìm hiểu về chủ đề nào?`,

      `Tôi hiểu bạn đang quan tâm đến "${userMessage}". 

Để hỗ trợ tốt nhất, tôi cần thêm thông tin:
- Bạn đang sử dụng module nào của MiniWMS?
- Vấn đề cụ thể bạn gặp ph��i là gì?
- Bạn có vai trò gì trong hệ thống (Admin, Manager, Staff)?

Với những thông tin này, tôi có thể đưa ra hướng dẫn chi tiết và phù hợp nhất.`,

      `Dựa trên câu hỏi của bạn về "${userMessage}", tôi khuyên bạn nên:

1. **Kiểm tra documentation** trong phần Help
2. **Xem video tutorials** trên dashboard
3. **Thử demo features** trong sandbox mode
4. **Liên hệ support team** nếu cần hỗ trợ realtime

Tôi có thể hướng dẫn chi tiết từng bước nếu bạn cho biết chính xác bạn muốn làm gì?`,
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await simulateAIResponse(inputMessage);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        status: "sent",
        suggestions: [
          "Tôi cần hướng dẫn chi tiết",
          "Có ví dụ cụ thể không?",
          "Cách khắc phục lỗi?",
          "Video hướng dẫn ở đâu?",
        ],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "Xin lỗi, tôi gặp sự cố khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.",
        timestamp: new Date(),
        status: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "Cuộc trò chuyện mới",
      lastMessage: "",
      timestamp: new Date(),
      messages: [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversation(newConversation.id);
    setMessages([]);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversation === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log("Files uploaded:", files);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/\n/g, "<br>");
  };

  return (
    <>
      <div className="h-[calc(100vh-5rem)] flex">
        {/* Sidebar - Conversations */}
        <div className="w-80 border-r bg-white flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Bot className="w-5 h-5 mr-2 text-blue-600" />
                AI Assistant
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
                <Dialog open={showSettings} onOpenChange={setShowSettings}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cài đặt AI</DialogTitle>
                      <DialogDescription>
                        Tùy chỉnh trải nghiệm chat với AI assistant
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Model AI</Label>
                        <Select
                          value={selectedModel}
                          onValueChange={setSelectedModel}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {aiPersonalities.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                <div className="flex items-center">
                                  <model.icon
                                    className={`w-4 h-4 mr-2 ${model.color}`}
                                  />
                                  <div>
                                    <p className="font-medium">{model.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {model.description}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowSettings(false)}>
                        Đóng
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Button onClick={createNewConversation} className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Cuộc trò chuyện mới
            </Button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  currentConversation === conversation.id
                    ? "bg-blue-50 border-blue-200"
                    : ""
                }`}
                onClick={() => {
                  setCurrentConversation(conversation.id);
                  setMessages(conversation.messages);
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">
                    {conversation.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {conversation.lastMessage || "Chưa có tin nhắn"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {conversation.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {aiPersonalities.find((p) => p.id === selectedModel)
                        ?.name || "AI Assistant"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {isTyping ? "Đang soạn tin..." : "Trực tuyến"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Hoạt động
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Chào mừng đến với AI Assistant!
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Tôi có thể hỗ trợ bạn về MiniWMS và quản lý kho hàng
                    </p>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center text-center"
                          onClick={() => handleQuickAction(action.prompt)}
                        >
                          <action.icon className="w-6 h-6 mb-2 text-blue-600" />
                          <span className="text-sm font-medium">
                            {action.label}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        } rounded-lg p-3 shadow-sm`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "assistant" && (
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div
                              className="text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: formatMessage(message.content),
                              }}
                            />

                            {message.suggestions && (
                              <div className="mt-3 space-y-1">
                                {message.suggestions.map(
                                  (suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="ghost"
                                      size="sm"
                                      className="h-auto p-2 text-xs bg-white/20 hover:bg-white/30"
                                      onClick={() =>
                                        handleQuickAction(suggestion)
                                      }
                                    >
                                      {suggestion}
                                    </Button>
                                  ),
                                )}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              {message.type === "assistant" && (
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyMessage(message.content)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ThumbsDown className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {message.type === "user" && (
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        multiple
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsListening(!isListening)}
                        className={isListening ? "text-red-600" : ""}
                      >
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Nhập tin nhắn... (Shift + Enter để xuống dòng)"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="min-h-[44px] max-h-32 resize-none"
                      rows={1}
                    />
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="h-11"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Suggestions */}
                <div className="flex items-center space-x-2 mt-2 overflow-x-auto">
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    Gợi ý:
                  </span>
                  {[
                    "Hướng dẫn nhanh",
                    "Khắc phục lỗi",
                    "Video tutorial",
                    "Liên hệ support",
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 flex-shrink-0"
                      onClick={() => setInputMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // No conversation selected
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Chọn cuộc trò chuyện
                </h3>
                <p className="text-gray-500 mb-4">
                  Chọn một cuộc trò chuyện hiện có hoặc tạo mới để bắt đầu
                </p>
                <Button onClick={createNewConversation}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Bắt đầu chat mới
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Label({ className, children, ...props }: any) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props}>
      {children}
    </label>
  );
}
