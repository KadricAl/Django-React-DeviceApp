import logo from './logo.svg';
import './App.css';
import React from 'react';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">React + Tailwind + MUI</h1>
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Tailwind Button
      </button>

      <Button variant="contained" color="primary">
        MUI Button
      </Button>
    </div>
  );
}

export default App;
