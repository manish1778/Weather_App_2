import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import "./TodoList.css";

const TodoList = ({ todolist, handleToggle, handleDelete }) => {
  return (
    <ul className="list">
      {todolist.map((listItem) => (
        <li key={listItem.id} className={listItem.done ? "notDone" : "Done"}>
          <span className="actions">
            {listItem.done ? (
              <CheckBoxOutlineBlankIcon
                onClick={() => handleToggle(listItem.id)}
              />
            ) : (
              <CheckBoxIcon onClick={() => handleToggle(listItem.id)} />
            )}
          </span>
          <span>{listItem.item}</span>
          <span className="actions">
            <DeleteForeverIcon onClick={() => handleDelete(listItem.id)} />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
