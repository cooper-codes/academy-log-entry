
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Academy Log Entries</h1>
      </div>
    </header>
  );
};

export default Header;
