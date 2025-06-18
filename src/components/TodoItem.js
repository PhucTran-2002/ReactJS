import React, { useState, useEffect } from 'react';
import styles from './TodoItem.module.css';


// Functional Component with Props
const TodoItem = ({ title, completed, onToggle, onDelete }) => {
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

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the parent's onClick
    onDelete();
  };

  // Conditional rendering based on state
  const getStatusColor = () => {
    if (completed) return '#4CAF50';
    if (isHovered) return '#2196F3';
    return '#666';
  };

  return (
    <div 
      className={`${styles.container} ${completed ? styles.completed : ''}`}
      onClick={onToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.content}>
        <h3 className={`${styles.title} ${completed ? styles.completedTitle : ''}`}>
          {title}
        </h3>
        <p className={styles.status}>
          Status: {completed ? 'Completed' : 'Pending'}
        </p>
        {/* Conditional rendering */}
        {completionDate && (
          <p className={styles.completionDate}>
            Completed on: {completionDate}
          </p>
        )}
      </div>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem; 