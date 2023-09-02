import { useSelector, useDispatch } from 'react-redux';

import { Tab } from '../../../models/todo.interface';
import { todoAppState } from '../../../../redux/reducer';
import { changeTab, clearCompleted } from '../../../../redux/action';

const TodoFooter = () => {
  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];
  const tab = useSelector((state: todoAppState) => state.tab);
  const dispatch = useDispatch();
  const todos = useSelector((state: todoAppState) => state.todos);
  const countTodoActive = () => {
    return todos?.filter((item) => item.status === false).length;
  };
  const handleClearCompletedTodo = () => {
    dispatch(changeTab(Tab.ALL));
    dispatch(clearCompleted());
  };

  const handleChangeTab = (newTab: Tab) => {
    dispatch(changeTab(newTab));
  };

  return (
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
  );
};

export default TodoFooter;
