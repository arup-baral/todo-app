import { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import { TodoContextProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";

function App() {
  const LOCAL_STORAGE_KEY = "todos-key";

  const [todoList, setTodoList] = useState([]);

  // add TODO object to list
  function addTodo(task) {
    const todoObject = {
      id: Date.now(),
      task: task,
      completed: false,
    };

    setTodoList((prev) => [...prev, todoObject]);
  }

  // edit a TODO object
  function editTodo(id, newTodo) {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? newTodo : todo))
    );
  }

  // delete a TODO object
  function deleteTodo(id) {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  // update TODO completed property
  function isTodoCompleted(id) {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // remove all the todos
  function clearTodo() {
    setTodoList([]);
  }

  useEffect(() => {
    const cashedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (cashedTodo && cashedTodo.length > 0) {
      setTodoList(cashedTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContextProvider
      value={{
        todoList,
        addTodo,
        editTodo,
        deleteTodo,
        isTodoCompleted,
        clearTodo,
      }}
    >
      <div className="container">
        <div className="upper-box">
          {/* heading */}
          <h2 className="text-white p-8 mx-auto">Manage Your Todos</h2>

          {/* input-field */}
          <TodoForm />

          {/* TODO-list-div */}
          <div className="todo-list-div">
            {todoList.map((todoObj) => (
              <TodoItem key={todoObj.id} todo={todoObj} />
            ))}
          </div>
        </div>
        <div className="lower-box">
          {/* clear button */}
          <button
            className={`clear-todo ${todoList.length == 0 ? 'bg-red-300/50 text-gray-300' : 'bg-red-600 hover:bg-red-800'}`}
            onClick={clearTodo}
            disabled={todoList.length == 0}
          >
            Clear Todos
          </button>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
