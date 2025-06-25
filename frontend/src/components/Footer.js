import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Device Manager. All rights reserved.
      </div>
    </footer>
  );
}
