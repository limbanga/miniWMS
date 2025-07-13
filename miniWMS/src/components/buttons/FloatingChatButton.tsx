import { useState, useEffect, useRef } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

interface ChatMessage {
  sender: "user" | "ai";
  content: string;
}

export default function FloatingChatButton() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([
    {
      sender: "ai",
      content: "Xin chào! Tôi là trợ lý AI của bạn. Bạn cần hỗ trợ gì hôm nay?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { sender: "user", content: message };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    // Giả lập phản hồi của AI
    setTimeout(() => {
      const fakeResponse: ChatMessage = {
        sender: "ai",
        content: `Đây là phản hồi cho: "${userMessage.content}"`,
      };
      setChat((prev) => [...prev, fakeResponse]);
      setLoading(false);
    }, 1000);
  };

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="rounded-full w-14 h-14 shadow-lg p-0 bg-primary text-white hover:bg-primary/90"
            aria-label="Chat AI"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="animate-ping absolute w-14 h-14 rounded-full bg-primary/20 shadow-lg" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[320px] h-[400px] p-4 flex flex-col space-y-3 shadow-xl rounded-xl">
          <h3 className="text-base font-semibold text-primary">TKSolutions - Tư vấn viên AI</h3>

          {/* Lịch sử tin nhắn */}
          <ScrollArea className="flex-1 bg-muted rounded p-3 overflow-y-auto border text-sm" ref={scrollRef}>
            <div className="space-y-2">
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg whitespace-pre-line max-w-[90%] ${
                    msg.sender === "user"
                      ? "bg-primary text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600 text-sm inline-flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Đang soạn phản hồi...
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex flex-col gap-2">
            <Textarea
              rows={2}
              placeholder="Nhập câu hỏi của bạn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none text-sm"
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              className="w-full text-sm"
              disabled={!message.trim() || loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang gửi...
                </span>
              ) : (
                "Gửi"
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
