import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import TodoFooter from './TodoFooter';
import TodoList from './TodoList';
import { addTodo, completedAll } from '../../../../redux/action';
import { todoAppState } from '../../../../redux/reducer';
import {
  StorageKey,
  saveDataToLocalStorage,
} from '../../../shared/utils/localStorage';

const TodoBody = () => {
  let dispatch = useDispatch();
  const todoInputRef = useRef<any>(null);
  const todos = useSelector((state: todoAppState) => state.todos);

  useEffect(() => {
    saveDataToLocalStorage(StorageKey.TODO_LIST, todos || []);
  }, [todos]);

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
  const handleCompletedAll = () => {
    dispatch(completedAll());
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };
  return (
    <div className="todo-app-body">
      <div className="app-content-header">
        <span>
          <img
            onClick={handleCompletedAll}
            className="checkList-img"
            src="https://yudquang-todo.surge.sh/static/media/todo-app.6d930714.svg"
            alt=""
          />
        </span>
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
      <TodoList />
      <TodoFooter />
    </div>
  );
};

export default TodoBody;
