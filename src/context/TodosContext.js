import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';

const TodosContext = createContext();

const initialTodos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Build a Todo App', completed: false },
  { id: 3, title: 'Master Components', completed: false }
];

function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'delete':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [newTodo, setNewTodo] = React.useState('');
  const [error, setError] = React.useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
    setError('');
  };

  const validateTodo = (title) => {
    if (!title.trim()) {
      return 'Todo title cannot be empty';
    }
    if (title.length < 3) {
      return 'Todo title must be at least 3 characters long';
    }
    if (todos.some(todo => todo.title.toLowerCase() === title.toLowerCase())) {
      return 'This todo already exists';
    }
    return '';
  };

  const addTodo = (e) => {
    e.preventDefault();
    const err = validateTodo(newTodo);
    if (err) {
      setError(err);
      return;
    }
    const newTodoObj = {
      id: Date.now(),
      title: newTodo,
      completed: false
    };
    dispatch({ type: 'add', payload: newTodoObj });
    setNewTodo('');
    setError('');
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'toggle', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'delete', payload: id });
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  return (
    <TodosContext.Provider value={{
      todos,
      newTodo,
      error,
      inputRef,
      handleInputChange,
      addTodo,
      toggleTodo,
      deleteTodo,
      getStats
    }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
export default TodosProvider; 