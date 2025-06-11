import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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

export default StateDemo;