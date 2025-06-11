import { createContext } from 'react';

// Context untuk Theme
export const ThemeContext = createContext();

// Reducer untuk kompleks state management
export const counterReducer = (state, action) => {
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

export default ThemeContext;