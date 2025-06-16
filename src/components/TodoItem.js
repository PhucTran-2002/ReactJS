import React from 'react';

// Functional Component with Props
const TodoItem = ({ title, completed, onToggle }) => {
  return (
    <div 
      style={{ 
        padding: '10px',
        margin: '5px',
        backgroundColor: completed ? '#e0e0e0' : '#ffffff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      onClick={onToggle}
    >
      <h3 style={{ 
        textDecoration: completed ? 'line-through' : 'none',
        color: completed ? '#666' : '#000'
      }}>
        {title}
      </h3>
      <p>Status: {completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
};

export default TodoItem; 