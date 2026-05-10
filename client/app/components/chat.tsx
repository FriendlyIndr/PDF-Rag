"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Doc {
  pageContent?: string;
  metaData?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

interface IMessage {
  role: "assistant" | "user";
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const handleSendChatMessage = async () => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    const res = await fetch(`http://localhost:8000/chat?message=${message}`);
    const data = await res.json();
    console.log(data);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data?.answer, documents: data?.docs },
    ]);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 justify-end">
        {messages.map((message, index) => (
          <div
            className={`
              p-3 flex-none max-w-[60%] rounded-xl
              ${message.role == "user" ? "bg-gray-300 ml-auto" : ""}
            `}
            key={index}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 w-[65%] flex gap-3">
        <Input
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendChatMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
