import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from '@clerk/nextjs';
import React from 'react';
import { Button } from '../ui/button';

export const SignIn = () => {
  return (
    <Button asChild>
      <SignInButton />
    </Button>
  );
};

export const AuthButtons = () => {
  return (
    <div>
      <SignedIn>
        <div className="flex flex-row items-center gap-x-2">
          <SignOutButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignIn />
        <SignUpButton />
      </SignedOut>
    </div>
  );
};
