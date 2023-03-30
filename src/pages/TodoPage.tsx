import React, { useState } from 'react';
import TodoList from './TodoList';

interface Todo {
  id: number;
  text: string;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');

  const addTodo = () => {
    if (!text) return;
    setTodos([...todos, { id: todos.length + 1, text }]);
    setText('');
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      return newTodos.map((todo, index) => {
        return {
          ...todo,
          id: index + 1,
        };
      });
    });
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: newText,
          };
        } else {
          return todo;
        }
      });
    });
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: newText,
          };
        } else {
          return todo;
        }
      });
    });
  };
  

  return (
    <div className="flex justify-center">
      <div className="max-w-2xl w-full shadow-lg px-4">
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-center my-3">AI Todo</h1>
        </div>
        <div className="flex justify-center">
          <label htmlFor="list-to-do" className="sr-only">
            Add a task
          </label>
          <input
            type="text"
            id="list-to-do"
            name="list-to-do"
            value={text}
            className="border-2 border-blue-400 py-2 px-4 rounded-none flex-auto w-64 mr-2"
            placeholder="Add a task"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            style={{ fontSize: 18 }}
            className="bg-blue-500 text-white py-2 px-4 rounded-none hover:bg-blue-600"
            onClick={addTodo}
          >
            Execute
          </button>
        </div>
        <div className="my-3 py-2 bg-gray-50 flex justify-between border-2 border-black-600">
          <div className="w-1/6 pl-6 text-gray-400 font-semibold">ID</div>
          <div className="w-4/6 text-gray-400 font-semibold">TITLE</div>
          <div className="w-1/6 text-gray-400 font-semibold">ACTION</div>
        </div>
        <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} updateTodo={updateTodo} />
      </div>
    </div>
  );
};

export default TodoPage;