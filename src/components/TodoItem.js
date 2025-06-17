import React, { useState, useEffect } from 'react';

// Functional Component with Props
const TodoItem = ({ title, completed, onToggle }) => {
  // State management using useState
  const [isHovered, setIsHovered] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);

  // useEffect for lifecycle management
  useEffect(() => {
    if (completed) {
      setCompletionDate(new Date().toLocaleDateString());
    }
  }, [completed]);

  // Event handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Conditional rendering based on state
  const getStatusColor = () => {
    if (completed) return '#4CAF50';
    if (isHovered) return '#2196F3';
    return '#666';
  };

  return (
    <div 
      style={{ 
        padding: '10px',
        margin: '5px',
        backgroundColor: completed ? '#e0e0e0' : '#ffffff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      onClick={onToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 style={{ 
        textDecoration: completed ? 'line-through' : 'none',
        color: completed ? '#666' : '#000'
      }}>
        {title}
      </h3>
      <p style={{ color: getStatusColor() }}>
        Status: {completed ? 'Completed' : 'Pending'}
      </p>
      {/* Conditional rendering */}
      {completionDate && (
        <p style={{ fontSize: '0.8em', color: '#666' }}>
          Completed on: {completionDate}
        </p>
      )}
    </div>
  );
};

export default TodoItem; 