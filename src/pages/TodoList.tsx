import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  updateTodo: (todos: Todo[]) => void;
}

const TodoList: React.FC<Props> = ({ todos, deleteTodo, updateTodo }) => {
  const [isCheckedMap, setIsCheckedMap] = useState<{ [key: number]: boolean }>({});
  const [editText, setEditText] = useState<{ id: number, text: string }>({ id: -1, text: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleCheck = (id: number) => {
    setIsCheckedMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleEdit = (id: number, text: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].text = editText.text;
    updateTodo([...newTodos]);
    setEditText({ id: -1, text: '' });
    setIsEditing(false);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="flex justify-between items-center py-2 px-6 border-b border-gray-200">
          <div className="text-gray-500 w-12">{todo.id}</div>
          <div className={`flex-1 ml-2 ${isCheckedMap[todo.id] ? 'line-through' : ''}`} style={{ marginLeft: 'calc(5px + 2rem)' }}>
            {isEditing && editText.id == todo.id ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleEdit(todo.id, editText.text);
              }}>
                <input type="text" value={editText.text} onChange={(e) => setEditText({ id: todo.id, text: e.target.value })} />
              </form>
            ) : (
              todo.text
            )}
          </div>
          {isEditing && editText.id === todo.id ? (
            <button className="bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600 mr-3"
              onClick={() => setIsEditing(false)}>
              <svg className="h-8 w-8 text-white"
                width="24" height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
              </svg></button>
          ) : (
            <button className="bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600 mr-3"
              onClick={() => {
                setEditText({ id: todo.id, text: todo.text });
                setIsEditing(true);
              }}>
              {isEditing && editText.id === todo.id ? 'Done' : <svg className="h-8 w-8 text-white"
                width="24" height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>}</button>
          )}

          <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-600 mr-3">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <button onClick={() => handleCheck(todo.id)} className="bg-green-500 text-white py-1 px-1 rounded hover:bg-green-600">
            {isCheckedMap[todo.id] ?
              <svg className="h-8 w-8 text-white"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg> :
              <svg className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>}
          </button>

        </div>
      ))}
    </div>
  );
}

export default TodoList;
