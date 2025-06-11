import React, { useReducer } from 'react';
import { RotateCcw } from 'lucide-react';
import { counterReducer } from '../contexts/ThemeContext'; // Import reducer dari context

// Component untuk useReducer Hook
const ReducerDemo = () => {
  const [state, dispatch] = useReducer(counterReducer, {
       count: 0,
       history: ['Aplikasi dimulai pada ' + new Date().toLocaleTimeString()]
    });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-purple-600">useReducer Hook</h3>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-800 mb-4">{state.count}</div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => dispatch({ type: 'decrement' })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Kurang
          </button>
          <button
            onClick={() => dispatch({ type: 'reset' })}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => dispatch({ type: 'increment' })}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Tambah
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">History:</h4>
        <div className="bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
          {state.history.map((entry, index) => (
            <div key={index} className="text-sm text-gray-600 mb-1">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReducerDemo;