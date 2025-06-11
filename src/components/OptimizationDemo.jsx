import React, { useState, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';

// Component untuk useCallback & useMemo
const OptimizationDemo = () => {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [items] = useState(['Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Pineapple']);

  // useMemo untuk expensive computation
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < count * 1000; i++) {
      result += i;
    }
    return result;
  }, [count]);

  // useCallback untuk prevent unnecessary re-renders
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-indigo-600">useCallback & useMemo</h3>

      <div className="grid gap-6">
        {/* Counter section */}
        <div>
          <h4 className="font-semibold mb-2">Counter dengan useCallback:</h4>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold">{count}</span>
            <button
              onClick={handleIncrement}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
            >
              +1
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Expensive value: <span className="font-mono">{expensiveValue}</span>
          </div>
        </div>

        {/* Filter section */}
        <div>
          <h4 className="font-semibold mb-2">Filter dengan useMemo:</h4>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Cari buah..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="space-y-1">
            {filteredItems.map((item, index) => (
              <div key={index} className="px-3 py-2 bg-gray-50 rounded">
                {item}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {filteredItems.length} dari {items.length} item
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationDemo;