import React, { useState, useEffect } from 'react';

// Component untuk useEffect Hook
const EffectDemo = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-green-600">useEffect Hook</h3>

      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded">
          <h4 className="font-semibold">Window Width:</h4>
          <p className="text-2xl font-mono text-blue-600">{windowWidth}px</p>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <h4 className="font-semibold">Mouse Position:</h4>
          <p className="font-mono text-blue-600">X: {mousePosition.x}, Y: {mousePosition.y}</p>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <h4 className="font-semibold">Connection Status:</h4>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {online ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffectDemo;