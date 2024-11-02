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

export const SignUp = () => {
  return (
    <Button variant="secondary" asChild>
      <SignUpButton />
    </Button>
  );
};

export const SignOut = () => {
  return (
    <Button variant="secondary" asChild>
      <SignOutButton />
    </Button>
  );
};

export const AuthButtons = () => {
  return (
    <>
      <SignedIn>
        <SignOut />
      </SignedIn>
      <SignedOut>
        <div className="flex items-center gap-x-2">
          <SignIn />
          <SignUp />
        </div>
      </SignedOut>
    </>
  );
};
