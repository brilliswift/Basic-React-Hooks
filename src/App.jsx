import React from 'react';
import StateDemo from './components/StateDemo';
import EffectDemo from './components/EffectDemo';
import ReducerDemo from './components/ReducerDemo';
import CustomHookDemo from './components/CustomHookDemo';
import OptimizationDemo from './components/OptimizationDemo';
import RefDemo from './components/RefDemo';
import ContextDemo from './components/ContextDemo';

// Main App Component
const App = () => {
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

export default App;