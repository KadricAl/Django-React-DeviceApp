import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white sticky top-0 shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left side */}
        <div className="text-2xl font-bold">
          <Link to="/">Device Manager</Link>
        </div>

        {/* Right side */}
        <ul className="flex space-x-6 text-lg">
          <li><Link to="/devices" className="hover:text-blue-300">Devices</Link></li>
          <li><Link to="/installed-devices" className="hover:text-blue-300">Installed Devices</Link></li>
          <li><Link to="/services" className="hover:text-blue-300">Services History</Link></li>
          <li><Link to="/customers" className="hover:text-blue-300">Customers</Link></li>
        </ul>
      </nav>
    </header>
  );
}

