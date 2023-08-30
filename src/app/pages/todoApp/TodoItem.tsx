import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoProps } from '../../models/todo.interface';
import { deleteTodo, updateTodo } from '../../../redux/action';

interface todoItemProps {
  todo: todoProps;
}
const TodoItem = ({ todo }: todoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const todoInputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const handleUpdateTodo = (todo: todoProps) => {
    dispatch(updateTodo(todo));
  };

  const handleChangeEditInput = () => {
    setIsEdit(!isEdit);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChangeEditInput();
      if (todoInputRef.current.value.trim()) {
        handleUpdateTodo({ ...todo, name: todoInputRef.current.value });
      }
    }
  };
  const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTodo({ ...todo, status: e.target.checked });
  };
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-check-input"
        onChange={toggleCompleted}
        checked={!!todo.status}
      />
      {isEdit ? (
        <input
          autoFocus
          ref={todoInputRef}
          className="todo-input"
          defaultValue={todo.name}
          onBlur={handleChangeEditInput}
          onKeyUp={handleEnterPress}
        />
      ) : (
        <span className="todo-item-name" onDoubleClick={handleChangeEditInput}>
          {todo.name}
        </span>
      )}
      <span
        className="icon icon-delete"
        onClick={() => handleDeleteTodo(todo.id)}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
