import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

type ProfilePageProps = {
  params: Promise<{ id: string }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const id = (await params).id;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
