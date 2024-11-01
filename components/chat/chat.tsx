'use client';

import { useSocketIO } from '@/hooks/useSocketIO';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '../ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const popupVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.9 },
};

const Chat = ({ id, username }: { id: string; username: string }) => {
  const { isConnected, sendMessage, messages, users } = useSocketIO(
    id,
    username,
  );
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const message = {
      username,
      content: input,
    };
    sendMessage(message);
    setInput('');
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-2">
      <button
        onClick={toggleChat}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isConnected ? <p>Connected</p> : <p>Not Connected</p>}

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-80"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Card className="bg-white rounded shadow-lg w-full">
              <CardHeader>
                <CardTitle>Chats</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-2">
                  <ScrollArea className="h-40">
                    {messages.map((msg, idx) => (
                      <div key={idx} className="flex flex-col gap-y-1">
                        <div className="inline-flex gap-x-2">
                          <span className="font-semibold">{msg.username}:</span>
                          <span>{msg.content}</span>
                        </div>
                        <div ref={chatContentRef} />
                      </div>
                    ))}
                  </ScrollArea>
                  <CardFooter className="p-0">
                    <Input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Type a message"
                      className="w-full"
                    />
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
