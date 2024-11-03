'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSocketIO } from '@/hooks/useSocketIO';
import { ScrollArea } from '../ui/scroll-area';

const chatBoxVariants = {
  closed: {
    height: '60px', // Small height for header-only view
    opacity: 1,
    transition: { duration: 0.3 },
  },
  open: {
    height: 'auto', // Expanded height for full chat view
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const ChatBox = ({ id, username }: { id: string; username: string }) => {
  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const autoScrollRef = useRef<HTMLDivElement>(null);

  const { sendMessage, messages, isConnected } = useSocketIO(id, username);

  const handleChatBoxToggle = () => setOpen(!isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const message = {
        username: username,
        content: input.trim(),
      };
      sendMessage(message);
    }
    setInput('');
  };

  useEffect(() => {
    if (autoScrollRef.current) {
      autoScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-80 rounded-lg shadow-lg">
      <motion.div
        className="overflow-hidden"
        variants={chatBoxVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <Card className="overflow-hidden h-full relative">
          <CardHeader className="flex flex-row items-center justify-between h-[60px]">
            <CardTitle>Match</CardTitle>
            <button className="self-end" onClick={handleChatBoxToggle}>
              {isOpen ? <ChevronDown /> : <ChevronUp />}
            </button>
          </CardHeader>
          <AnimatePresence>
            {isOpen && (
              <form onSubmit={handleSubmit}>
                <ScrollArea className="h-40">
                  <CardContent className="mt-2 space-y-2 flex flex-col">
                    {messages.map((msg, idx) => (
                      <div className="inline-flex gap-x-2" key={idx}>
                        <span className="font-semibold">{msg.username}:</span>
                        <span>{msg.content}</span>
                      </div>
                    ))}
                  </CardContent>

                  <div ref={autoScrollRef} />
                </ScrollArea>
                <CardFooter>
                  <Input
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Type a message..."
                  />
                </CardFooter>
              </form>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChatBox;
