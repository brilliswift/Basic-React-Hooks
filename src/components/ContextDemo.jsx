import React, { useState, useContext } from 'react';
import { Settings } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext'; // Import Context

// Komponen Pembantu untuk demonstrasi Context
const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded border-2 ${
        theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-600 bg-gray-700'
      }`}>
        <h4 className="font-semibold mb-2">Current Theme: {theme}</h4>
        <p className="mb-3">
          Komponen ini menggunakan context untuk mengakses theme tanpa props drilling.
        </p>
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            theme === 'light'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Settings size={16} />
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

// Component untuk useContext
const ContextDemo = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`p-6 rounded-lg shadow-md transition-colors ${
        theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
      }`}>
        <h3 className="text-xl font-bold mb-4 text-teal-600">useContext Hook</h3>
        <ThemedComponent />
      </div>
    </ThemeContext.Provider>
  );
};

export default ContextDemo;