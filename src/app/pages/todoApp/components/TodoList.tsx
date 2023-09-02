import { useSelector } from 'react-redux';

import { todoAppState } from '../../../../redux/reducer';
import { Tab, todoProps } from '../../../models/todo.interface';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector((state: todoAppState) => state.todos);
  const tab = useSelector((state: todoAppState) => state.tab);

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
    <ul className="todo-list">
      {todos &&
        filterTodoList(tab!).map((todo) => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
    </ul>
  );
};

export default TodoList;
