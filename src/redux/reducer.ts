import { ActionType, Tab, todoProps } from '../app/models/todo.interface';
import {
  StorageKey,
  getDataFromLocalStorage,
} from '../app/shared/utils/localStorage';
import {
  ADD_TODO,
  CHANE_TAB,
  CLEAR_COMPLETED,
  COMPLTED_ALL,
  DELETE_TODO,
  UPDATE_TODO,
} from './type';

export interface todoAppState {
  todos: todoProps[];
  tab: Tab;
}

const initialState: todoAppState = {
  todos: getDataFromLocalStorage(StorageKey.TODO_LIST),
  tab: Tab.ALL,
};

export const todoListReducer = (
  state = initialState,
  action: ActionType
): todoAppState => {
  const objReducer: Record<string, () => todoAppState> = {
    [ADD_TODO]: () => ({
      ...state,
      todos: [action.payload.todo, ...(state.todos || [])],
    }),
    [UPDATE_TODO]: () => ({
      ...state,
      todos: state.todos.map((item) => {
        return item.id === action.payload.todo.id ? action.payload.todo : item;
      }),
    }),
    [DELETE_TODO]: () => ({
      ...state,
      todos: state.todos.filter((item) => {
        return item.id !== action.payload.id;
      }),
    }),
    [CLEAR_COMPLETED]: () => ({
      ...state,
      todos: state.todos.filter((item) => {
        return item.status !== true;
      }),
    }),
    [COMPLTED_ALL]: () => {
      const isCheckAll = state.todos.every((item) => item.status === true);
      if (!isCheckAll) {
        return {
          ...state,
          todos: state.todos.map((item) => ({
            ...item,
            status: true,
          })),
        };
      } else {
        return {
          ...state,
          todos: state.todos.map((item) => ({
            ...item,
            status: false,
          })),
        };
      }
    },
    [CHANE_TAB]: () => ({
      ...state,
      tab: action.payload.tab,
    }),
  };
  return typeof objReducer[action.type] === 'function'
    ? objReducer[action.type]()
    : state;
};
