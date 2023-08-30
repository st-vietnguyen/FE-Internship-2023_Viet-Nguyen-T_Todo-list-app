import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
import { Tab, todoProps } from '../../models/todo.interface';
import {
  getDataFromLocalStorage,
  StorageKey,
  saveDataToLocalStorage,
} from '../../shared/utils/localStorage';

const TodoApp = () => {
  const [todos, setTodos] = useState<todoProps[]>(
    getDataFromLocalStorage(StorageKey.TODO_LIST)
  );
  // const [filterTodos, setFilterTodos] = useState<todoProps[]>([]);
  const todoInputRef = useRef<any>(null);
  const [tab, setTab] = useState<Tab>(Tab.ALL);

  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];

  const deleteTodo = (id: string) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };
  const updateTodo = (todo: todoProps) => {
    let newTodos = todos.map((item) => {
      return item.id === todo.id ? todo : item;
    });
    setTodos(newTodos);
  };

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: uuidv4(), name: todoInputRef.current.value, status: false },
    ]);
    todoInputRef.current.value = '';
    todoInputRef.current.focus();
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && todoInputRef.current.value.trim() !== '') {
      addTodo();
    }
  };
  const countTodoActive = () => {
    return todos.filter((item) => item.status === false).length;
  };
  const clearCompletedTodo = () => {
    setTodos(
      todos.filter((todo) => {
        return todo.status !== true;
      })
    );
  };

  useEffect(() => {
    saveDataToLocalStorage(StorageKey.TODO_LIST, todos);
  }, [todos]);

  const filterTodoList = (tab: Tab): todoProps[] => {
    const objectFilterTodo = {
      [Tab.ALL]: () => todos,
      [Tab.ACTIVE]: () =>
        todos.filter((item) => {
          return item.status === false;
        }),
      [Tab.COMPLETED]: () =>
        todos.filter((item) => {
          return item.status === true;
        }),
    };

    return objectFilterTodo[tab]();
  };

  const changeTab = (newTab: Tab) => {
    setTab(newTab);
  };
  return (
    <div className="todo-app">
      <div className="app-header">
        <h1 className="app-title">
          Todos
          <span role="img" className="icon icon-todo">
            📝
          </span>
        </h1>
      </div>
      <div className="todo-app-body">
        <div className="app-content-header">
          <i className="icon icon-checklist"></i>
          <input
            ref={todoInputRef}
            type="text"
            className="todo-input"
            placeholder="What need to be done?"
            onKeyUp={handleEnterPress}
          />
          <span className="btn active" onClick={addTodo}>
            ADD
          </span>
        </div>
        <ul className="todo-list">
          {todos &&
            filterTodoList(tab).map((todo) => {
              return (
                <TodoItem
                  deleteTodo={deleteTodo}
                  todo={todo}
                  key={todo.id}
                  updateTodo={updateTodo}
                />
              );
            })}
        </ul>
        <div className="todo-app-footer">
          <p className="">{countTodoActive()} item(s) left</p>
          <ul className="status-list">
            {tabs.map((item) => {
              return (
                <li className="status-item" key={item}>
                  <span
                    className={`btn ${item === tab ? Tab.ACTIVE : null}`}
                    onClick={() => changeTab(item)}>
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
          <span className="btn btn-outline-hover" onClick={clearCompletedTodo}>
            Clear Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
