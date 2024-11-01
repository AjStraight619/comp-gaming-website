import React from 'react';
import { AuthButtons } from '../auth/auth-buttons';

const Navbar = () => {
  return (
    <nav className="h-16 border-b fixed top-0 right-0 left-0">
      <div className="h-full container flex items-center">
        <div className="flex-1"></div>
        {/* <div>Yo</div> */}
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;
