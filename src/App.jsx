// Polyfill window.storage with localStorage so the app works in a normal browser
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    get: async (key) => {
      const v = localStorage.getItem(key);
      return v === null ? null : { key, value: v };
    },
    set: async (key, value) => {
      localStorage.setItem(key, value);
      return { key, value };
    },
    delete: async (key) => {
      localStorage.removeItem(key);
      return { key, deleted: true };
    },
    list: async (prefix = '') => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
      return { keys, prefix };
    },
  };
}

import BookVizier from './book_vizier.jsx';

function App() {
  return <BookVizier />;
}

export default App;