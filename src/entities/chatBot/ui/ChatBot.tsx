"use client";

import { X, Send, Loader2, Bot } from "lucide-react";
import { useChat } from "../model/useChat";

interface Props {
  quizContent?: string;
}

const ChatBot = ({ quizContent }: Props) => {
  const {
    isOpen,
    setIsOpen,
    isLoading,
    messages,
    input,
    setInput,
    handleKeyPress,
    handleSend,
    messagesEndRef,
  } = useChat(quizContent);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">AI 학습 도우미</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">궁금한 점을 물어보세요!</p>
              </div>
            ) : (
              messages.map((message, idx) => {
                if (
                  message.role === "assistant" &&
                  !message.content.trim() &&
                  !message.loading
                )
                  return null;

                return (
                  <div
                    key={idx}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.loading ? (
                        <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                      ) : (
                        <>
                          <pre className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </pre>
                          {message.done && (
                            <pre
                              className={`text-xs mt-1 ${
                                message.role === "user"
                                  ? "text-white/70"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString("ko-KR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </pre>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`p-2 rounded-lg transition-colors ${
                  isLoading || !input.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
