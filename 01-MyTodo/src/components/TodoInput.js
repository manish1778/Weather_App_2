// TodoInput.js
import React from "react";
import "./TodoInput.css";

const TodoInput = ({ text, setText, addItem, handleClearButton }) => {
  return (
    <div className="main">
      <button className="clearButton" onClick={handleClearButton}>
        Clear
      </button>
      <div className="adder">
        <input
          type="text"
          placeholder="Add items to your list"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span onClick={addItem}>+</span>
      </div>
    </div>
  );
};

export default TodoInput;
