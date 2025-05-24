import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";

function App() {
  const [text, setText] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [duplicateMessage, setDuplicateMessage] = useState(""); // State to show a message

  const addItem = () => {
    if (text.trim() === "") return; // Prevent empty items

    // Check if item already exists (case-insensitive)
    const isDuplicate = todolist.some(
      (listItem) => listItem.item.toLowerCase() === text.toLowerCase()
    );

    if (isDuplicate) {
      setDuplicateMessage(`"${text}" already exists!`);
      setTimeout(() => setDuplicateMessage(""), 2000); // Remove message after 2 sec
      return;
    }

    const newTodoItem = {
      id: uuidv4(),
      item: text,
      done: true,
    };

    setTodolist([...todolist, newTodoItem]);
    setText("");
    setDuplicateMessage(""); // Clear any previous message
  };

  const handleToggle = (itemId) => {
    const newTodolist = todolist.map((listItem) => {
      if (listItem.id === itemId) {
        return { ...listItem, done: !listItem.done };
      }
      return listItem;
    });
    setTodolist(newTodolist);
  };

  const handleDelete = (itemId) => {
    const newTodolist = todolist.filter((listItem) => listItem.id !== itemId);
    setTodolist(newTodolist);
  };

  const handleClearButton = () => {
    setTodolist([]);
  };

  return (
    <div className="App">
      <h1>MY TODO</h1>
      <TodoInput
        text={text}
        setText={setText}
        addItem={addItem}
        handleClearButton={handleClearButton}
      />

      {duplicateMessage && (
        <p className="duplicateMessage">{duplicateMessage}</p>
      )}

      {todolist.length > 0 && (
        <TodoList
          todolist={todolist}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
