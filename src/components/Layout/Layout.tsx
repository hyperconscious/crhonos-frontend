import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow p-4 ml-20">{children}</main>
      </div>
      <footer className="text-blue-800 py-4 text-center">
        <span>© 2069 Limited</span>
      </footer>
    </div>
  );
}

export default Layout;
