import React, { useState, useEffect, useReducer, useCallback, useMemo, useRef, useContext, createContext } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Search, Bell, User, Settings } from 'lucide-react';

// Context untuk Theme
const ThemeContext = createContext();

// Reducer untuk kompleks state management
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1, history: [...state.history, `+1 pada ${new Date().toLocaleTimeString()}`] };
    case 'decrement':
      return { count: state.count - 1, history: [...state.history, `-1 pada ${new Date().toLocaleTimeString()}`] };
    case 'reset':
      return { count: 0, history: ['Reset pada ' + new Date().toLocaleTimeString()] };
    default:
      return state;
  }
};

// Custom Hook - FCP Way untuk reusable logic
const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, []);

  return { time, isRunning, start, pause, reset };
};

// Custom Hook untuk API simulation
const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Simulasi API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockUsers = [
          { id: 1, name: 'Ahmad Rizki', role: 'Frontend Developer', status: 'active' },
          { id: 2, name: 'Siti Nurhaliza', role: 'Backend Developer', status: 'active' },
          { id: 3, name: 'Budi Santoso', role: 'UI/UX Designer', status: 'inactive' }
        ];
        setUsers(mockUsers);
      } catch (err) {
        setError('Gagal memuat data pengguna');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
};

// Component untuk useState Hook
const StateDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-blue-600">useState Hook</h3>

      {/* Counter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Simple Counter:</h4>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Input Handling:</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama Anda..."
          className="border border-gray-300 px-3 py-2 rounded w-full mb-2"
        />
        <p className="text-gray-600">Halo, {name || 'Pengunjung'}! 👋</p>
      </div>

      {/* Todo List */}
      <div>
        <h4 className="font-semibold mb-2">Todo List:</h4>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Tambah todo baru..."
            className="border border-gray-300 px-3 py-2 rounded flex-1"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Tambah
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4"
              />
              <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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

// Main App Component
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            React Hooks - FCP Way
          </h1>
          <p className="text-gray-600 text-lg">
            Panduan lengkap penggunaan React Hooks dengan Functional Component Pattern
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-2">
          <StateDemo />
          <EffectDemo />
          <ReducerDemo />
          <CustomHookDemo />
          <OptimizationDemo />
          <RefDemo />
        </div>

        <div className="mt-6">
          <ContextDemo />
        </div>
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Demo interaktif React Hooks dengan pendekatan Functional Component Pattern (FCP)
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
