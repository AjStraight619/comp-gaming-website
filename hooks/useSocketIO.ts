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
  const [messages, setMessages] = useState<Message[]>([]); // ! Use optimistic here because we are going to use websocket and
  const [users, setUsers] = useState<User[]>([]);
  const [timer, setTimer] = useState(0);

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

    socket.on('timer update', time => {
      setTimer(time);
    });

    socket.on('timer finished', () => {
      toast('Timer finished!');
      setTimer(0);
    });

    // Clean up listeners and disconnect on unmount
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('user joined');
      socket.off('chat message');
      socket.off('timer update');
      socket.off('timer finished');
      socket.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = (message: Message) => {
    if (roomId && message.content.trim()) {
      socket.emit('chat message', roomId, message);
    }
  };

  const startTimer = (seconds: number) => {
    if (roomId) {
      socket.emit('start timer', roomId, seconds);
    }
  };

  return { isConnected, messages, sendMessage, startTimer, timer, users };
};
