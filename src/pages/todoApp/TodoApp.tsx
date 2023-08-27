import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
import { todoProps } from '../../shared/services/todo.interface';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../../shared/utils/localStorage';

const TodoApp = () => {
  const [todos, setTodos] = useState<todoProps[]>(
    getDataFromLocalStorage('todoList')
  );
  const [filterTodos, setFilterTodos] = useState<todoProps[]>([]);
  const todoInputRef = useRef<any>(null);
  const [tab, setTab] = useState('All');

  const tabs = ['All', 'Active', 'Completed'];

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
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  const clearCompletedTodo = () => {
    setTodos(
      todos.filter((todo) => {
        return todo.status !== true;
      })
    );
  };

  useEffect(() => {
    setFilterTodos(todos);
    saveDataToLocalStorage('todoList', todos);
  }, [todos]);

  const filterTodoList = (tab: string): todoProps[] => {
    let filteredTodos: todoProps[] = [];
    switch (tab) {
      case 'All':
        filteredTodos = todos;
        break;
      case 'Active':
        filteredTodos = todos.filter((item) => {
          return item.status === false;
        });
        break;
      case 'Completed':
        filteredTodos = todos.filter((item) => {
          return item.status === true;
        });
        break;
      default:
        break;
    }
    return filteredTodos || [];
  };

  useEffect(() => {
    setFilterTodos(filterTodoList(tab));
  }, [tab]);

  const changeTab = (newTab: string) => {
    setTab(newTab);
  };
  return (
    <div className='todo-app'>
      <div className='app-header'>
        <h1 className='app-title'>
          Todos
          <span role='img' className='icon icon-todo'>
            📝
          </span>
        </h1>
      </div>
      <div className='todo-app-body'>
        <div className='app-content-header'>
          <i className='icon icon-checklist'></i>
          <input
            ref={todoInputRef}
            type='text'
            className='todo-input'
            placeholder='What need to be done?'
            onKeyDown={handleEnterPress}
          />
          <span className='btn active' onClick={addTodo}>
            ADD
          </span>
        </div>
        <ul className='todo-list'>
          {todos &&
            filterTodos.map((todo) => {
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
        <div className='todo-app-footer'>
          <p className=''>{todos?.length} items left</p>
          <ul className='status-list'>
            {tabs.map((item) => {
              return (
                <li className='status-item' key={item}>
                  <span
                    className={`btn ${item === tab ? 'active' : null}`}
                    onClick={() => changeTab(item)}>
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
          <span className='btn btn-outline-hover' onClick={clearCompletedTodo}>
            Clear Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
