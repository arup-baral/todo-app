import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [checked, setChecked] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);
  const [edit, setEdit] = useState(false);

  const {editTodo, deleteTodo, isTodoCompleted} = useContext(TodoContext);

  const toggleItem = () => {
    isTodoCompleted(todo.id);
    setChecked(prev => !prev);
  }

  const editItem = () => {
    if(edit) {
      editTodo(todo.id, {...todo, task: todoMsg})
    }

    setEdit((prev) => !prev);
  }

  const deleteItem = () => {
    deleteTodo(todo.id);
  }

  return (
    <div className={`item-container ${checked ? 'bg-green-200' : 'bg-pink-200'}`}>
      <input type="checkbox" className="cursor-pointer" onClick={toggleItem}/>
      <input
        type="text"
        className={`item-textbox ${edit ? 'border border-black/30' : 'border-none'} ${checked ? 'line-through' : ''}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!edit}
      />
      <button className="item-button" onClick={editItem} disabled={checked}>
        {edit ? "📁" : "✏️"}
      </button>
      <button className="item-button" onClick={deleteItem}>❌</button>
    </div>
  );
}

export default TodoItem;
