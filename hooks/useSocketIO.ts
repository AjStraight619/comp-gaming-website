import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import { toast } from 'sonner';

type Message = {
  username: string;
  content: string;
};

type User = {
  username: string;
};

export const useSocketIO = (roomId: string, username: string) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Connect to socket on mount
    socket.connect();

    // Handle connection and disconnection status
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // Join the specified room
    if (roomId && username) {
      socket.emit('joinRoom', roomId, username);
    }

    socket.on('user joined', newUser => {
      console.log(`${newUser.username} joined the room`);
      setUsers(prevUsers => [...prevUsers, newUser]);
      toast(`${newUser.username} has joined!`);
    });

    // Listen for 'chat message' events
    socket.on('chat message', msg => {
      console.log('Message recieved from chat message event: ', msg);
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    // Clean up listeners and disconnect on unmount
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('user joined');
      socket.off('chat message');
      socket.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = (message: Message) => {
    if (roomId && message.content.trim()) {
      socket.emit('chat message', roomId, message);
    }
  };

  return { isConnected, messages, sendMessage, users };
};
