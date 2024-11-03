import Chat from '@/components/chat/chat';
import ChatBox from '@/components/chat/chat-box';
import React from 'react';

type MatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const MatchPage = async ({ params }: MatchPageProps) => {
  const id = (await params).id;

  const username = 'Vital';
  return (
    <div>
      {/* <Chat id={id} username={username} /> */}
      <ChatBox id={id} username={username} />
    </div>
  );
};

export default MatchPage;
