import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
import { Tab, todoProps } from '../../models/todo.interface';
import {
  StorageKey,
  saveDataToLocalStorage,
} from '../../shared/utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, changeTab, clearCompleted } from '../../../redux/action';
import { todoAppState } from '../../../redux/reducer';

const TodoApp = () => {
  let dispatch = useDispatch();
  const todos = useSelector((state: todoAppState) => state.todos);
  const tab = useSelector((state: todoAppState) => state.tab);

  const todoInputRef = useRef<any>(null);

  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];

  const handleAddTodo = () => {
    if (todoInputRef.current.value.trim()) {
      const newTodo = {
        id: uuidv4(),
        name: todoInputRef.current.value.trim(),
        status: false,
      };

      dispatch(addTodo(newTodo));
    }

    todoInputRef.current.value = '';
    todoInputRef.current.focus();
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };
  const countTodoActive = () => {
    return todos?.filter((item) => item.status === false).length;
  };
  const handleClearCompletedTodo = () => {
    dispatch(clearCompleted());
  };

  const handleChangeTab = (newTab: Tab) => {
    dispatch(changeTab(newTab));
  };
  useEffect(() => {
    saveDataToLocalStorage(StorageKey.TODO_LIST, todos || []);
  }, [todos]);

  const filterTodoList = (tab: Tab): todoProps[] => {
    const objectFilterTodo = {
      [Tab.ALL]: () => todos,
      [Tab.ACTIVE]: () =>
        todos?.filter((item) => {
          return item.status === false;
        }),
      [Tab.COMPLETED]: () =>
        todos?.filter((item) => {
          return item.status === true;
        }),
    };

    return objectFilterTodo[tab]() || [];
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
          <span className="btn active" onClick={() => handleAddTodo()}>
            ADD
          </span>
        </div>
        <ul className="todo-list">
          {todos &&
            filterTodoList(tab!).map((todo) => {
              return <TodoItem todo={todo} key={todo.id} />;
            })}
        </ul>
        <div className="todo-app-footer">
          <p className="">{countTodoActive()} item(s) left</p>
          <ul className="status-list">
            {tabs.map((item) => {
              return (
                <li className="status-item" key={item}>
                  <span
                    className={`btn ${item === tab ? 'active' : ''}`}
                    onClick={() => handleChangeTab(item!)}>
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
          <span
            className="btn btn-outline-hover"
            onClick={handleClearCompletedTodo}>
            Clear Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
