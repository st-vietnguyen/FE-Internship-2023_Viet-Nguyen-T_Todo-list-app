import { useRef, useState } from 'react';
import { todoProps } from '../../models/todo.interface';

interface todoItemProps {
  todo: todoProps;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: todoProps) => void;
}
const TodoItem = (props: todoItemProps) => {
  const { todo, deleteTodo, updateTodo } = props;
  const [isEdit, setIsEdit] = useState(false);
  const todoInputRef = useRef<any>(null);

  const handleChangeEditInput = () => {
    setIsEdit(!isEdit);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChangeEditInput();
      if (todoInputRef.current.value.trim() !== '') {
        updateTodo({ ...todo, name: todoInputRef.current.value });
      }
    }
  };
  const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, status: e.target.checked });
  };
  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='todo-check-input'
        onChange={toggleCompleted}
        checked={!!todo.status}
        // defaultChecked={todo.status}
      />
      {isEdit ? (
        <input
          autoFocus
          ref={todoInputRef}
          className='todo-input'
          defaultValue={todo.name}
          onBlur={handleChangeEditInput}
          onKeyUp={handleEnterPress}
        />
      ) : (
        <span className='todo-item-name' onDoubleClick={handleChangeEditInput}>
          {todo.name}
        </span>
      )}
      <span className='icon icon-delete' onClick={() => deleteTodo(todo.id)}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
