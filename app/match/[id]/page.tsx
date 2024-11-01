import Chat from '@/components/chat/chat';
import React from 'react';

type MatchPageProps = {
  params: {
    id: string;
  };
};

const MatchPage = async ({ params }: MatchPageProps) => {
  const id = (await params).id;

  const username = 'Vital';
  return (
    <div>
      <Chat id={id} username={username} />
    </div>
  );
};

export default MatchPage;
