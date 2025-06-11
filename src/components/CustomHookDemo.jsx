import React from 'react';
import { Play, Pause, RotateCcw, User } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { useUserData } from '../hooks/useUserData';

// Component untuk Custom Hooks
const CustomHookDemo = () => {
  const timer = useTimer();
  const { users, loading, error } = useUserData();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-orange-600">Custom Hooks</h3>

      {/* Timer Hook */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">useTimer Custom Hook:</h4>
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-blue-600 mb-3">
            {formatTime(timer.time)}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={timer.isRunning ? timer.pause : timer.start}
              className={`flex items-center gap-2 px-4 py-2 rounded text-white transition-colors ${
                timer.isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {timer.isRunning ? <Pause size={16} /> : <Play size={16} />}
              {timer.isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={timer.reset}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* API Hook */}
      <div>
        <h4 className="font-semibold mb-2">useUserData Custom Hook:</h4>
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        ) : (
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <User size={20} className="text-gray-500" />
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.role}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomHookDemo;