import React, { Component } from 'react';
import TodoItem from './TodoItem';

// Class Component with State
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, title: 'Learn React', completed: false },
        { id: 2, title: 'Build a Todo App', completed: false },
        { id: 3, title: 'Master Components', completed: false }
      ]
    };
  }

  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }

  render() {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Todo List Example</h1>
        <div>
          {this.state.todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList; 