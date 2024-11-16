import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold">Car Management App</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Car Management App</p>
      </footer>
    </div>
  );
};

export default Layout;
