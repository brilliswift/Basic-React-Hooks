import React, { useState, useRef } from 'react';

// Component untuk useRef
const RefDemo = () => {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const [rerenderCount, setRerenderCount] = useState(0);
  const [refMessage, setRefMessage] = useState(''); // State baru untuk pesan

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementRef = () => {
    countRef.current += 1;
    // Mengganti alert dengan pesan di UI
    setRefMessage(`Ref count: ${countRef.current} (tidak trigger re-render)`);
    // Hapus pesan setelah beberapa detik
    setTimeout(() => setRefMessage(''), 3000);
  };

  const forceRerender = () => {
    setRerenderCount(prev => prev + 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-pink-600">useRef Hook</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">DOM Reference:</h4>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Klik tombol untuk focus..."
              className="border border-gray-300 px-3 py-2 rounded flex-1"
            />
            <button
              onClick={focusInput}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
            >
              Focus Input
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Mutable Value (tidak trigger re-render):</h4>
          <div className="flex gap-2">
            <button
              onClick={incrementRef}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Increment Ref ({countRef.current})
            </button>
            <button
              onClick={forceRerender}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Force Re-render ({rerenderCount})
            </button>
          </div>
          {refMessage && (
            <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded">
              {refMessage}
            </div>
          )}
          <p className="text-sm text-gray-600 mt-2">
            Ref count tetap {countRef.current} bahkan setelah re-render
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefDemo;