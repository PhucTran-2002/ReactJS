import React, { Component } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';
// Class Component with State
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, title: 'Learn React', completed: false },
        { id: 2, title: 'Build a Todo App', completed: false },
        { id: 3, title: 'Master Components', completed: false }
      ],
      newTodo: '',
      error: '',
    };
  }

  // Form handling
  handleInputChange = (e) => {
    this.setState({ 
      newTodo: e.target.value,
      error: '' // Clear error when user types
    });
  }

  // Form validation
  validateTodo = (title) => {
    if (!title.trim()) {
      return 'Todo title cannot be empty';
    }
    if (title.length < 3) {
      return 'Todo title must be at least 3 characters long';
    }
    if (this.state.todos.some(todo => todo.title.toLowerCase() === title.toLowerCase())) {
      return 'This todo already exists';
    }
    return '';
  }

  // Add new todo
  addTodo = (e) => {
    e.preventDefault();
    const error = this.validateTodo(this.state.newTodo);
    
    if (error) {
      this.setState({ error });
      return;
    }

    const newTodo = {
      id: Date.now(), // Using timestamp as unique key
      title: this.state.newTodo,
      completed: false
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
      newTodo: '',
      error: ''
    }));
  }

  // Toggle todo completion
  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }

  // Delete todo
  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  }

  // Calculate statistics
  getStats = () => {
    const total = this.state.todos.length;
    const completed = this.state.todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }

  render() {
    const stats = this.getStats();

    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Todo List Example</h1>
        
        {/* Todo Statistics */}
        <div className={styles.stats}>
          <span className={styles.statItem}>Total: {stats.total}</span>
          <span className={styles.statItem}>Completed: {stats.completed}</span>
          <span className={styles.statItem}>Pending: {stats.pending}</span>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={this.addTodo} className={styles.form}>
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            placeholder="Add a new todo..."
            className={`${styles.input} ${this.state.error ? styles.inputError : ''}`}
          />
          <button 
            type="submit"
            className={styles.button}
          >
            Add Todo
          </button>
        </form>

        {/* Error Message */}
        {this.state.error && (
          <div className={styles.errorMessage}>{this.state.error}</div>
        )}

        {/* Todo List */}
        <div>
          {this.state.todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.deleteTodo(todo.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList; 