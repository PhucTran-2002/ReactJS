import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import TodosProvider from './context/TodosContext';

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About</h2>
      <p>This is a Todo app demonstrating React Router and advanced hooks.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <TodosProvider>
      <Router>
        <nav style={{ margin: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Todo List</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TodosProvider>
  );
}

export default App;
