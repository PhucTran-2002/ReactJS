import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';
import { useTodosContext } from '../context/TodosContext';

// Class Component with State
function TodoList() {
  const { todos, newTodo, error, inputRef, handleInputChange, addTodo, toggleTodo, deleteTodo, getStats } = useTodosContext();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Todo List Example</h1>
      
      {/* Todo Statistics */}
      <div className={styles.stats}>
        <span className={styles.statItem}>Total: {getStats().total}</span>
        <span className={styles.statItem}>Completed: {getStats().completed}</span>
        <span className={styles.statItem}>Pending: {getStats().pending}</span>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className={styles.form}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          ref={inputRef}
        />
        <button 
          type="submit"
          className={styles.button}
        >
          Add Todo
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}

      {/* Todo List */}
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList; 