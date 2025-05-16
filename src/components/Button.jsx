import React from 'react';

function Button({ children, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl font-semibold transition 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'} 
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
