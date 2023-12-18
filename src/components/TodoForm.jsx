import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

function TodoForm() {
  const [task, setTask] = useState("");

  const {addTodo} = useContext(TodoContext);

  const submitTodo = (e) => {
    e.preventDefault();
    if(!task) return;
    addTodo(task);
    setTask(""); 
  }

  return (
    <form className="input-div">
      <input
        type="text"
        placeholder="Write Todo..."
        id="inputText"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <input type="button" value="Add" id="addButton" onClick={submitTodo} />
    </form>
  );
}

export default TodoForm;
