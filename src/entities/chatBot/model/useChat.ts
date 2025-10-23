import { useState, useRef, useEffect } from "react";
import { Message } from "../types/Message";
import { EventSourcePolyfill } from "event-source-polyfill";

export const useChat = (quizContent?: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const encodedMessage = encodeURIComponent(input);
      const encodedContext = quizContent
        ? encodeURIComponent(`현재 퀴즈: ${quizContent}`)
        : "";

      eventSourceRef.current = new EventSourcePolyfill(
        `https://9e8aa0078a9a.ngrok-free.app/chat?user_message=${encodedMessage}${encodedContext ? `&context=${encodedContext}` : ""}`,
        { headers: { "ngrok-skip-browser-warning": "69420" } }
      );

      let aiMessage = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          timestamp: new Date(),
          done: false,
          loading: true,
        },
      ]);

      eventSourceRef.current.addEventListener("message", (event) => {
        if (event.data === "[DONE]") {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === "assistant") {
              last.done = true;
              last.loading = false;
              last.timestamp = new Date();
            }
            return updated;
          });
          eventSourceRef.current?.close();
          setIsLoading(false);
          return;
        }

        if (!event.data.trim()) return;
        aiMessage += event.data;

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant") {
            last.content = aiMessage.replaceAll("<br>", "\n");
            last.loading = false;
          }
          return updated;
        });
      });

      eventSourceRef.current.onerror = () => {
        eventSourceRef.current?.close();
        setIsLoading(false);
      };
    } catch (error) {
      console.error("SSE Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
          timestamp: new Date(),
          done: true,
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    isOpen,
    setIsOpen,
    isLoading,
    messages,
    input,
    setInput,
    handleKeyPress,
    handleSend,
    messagesEndRef,
  };
};
