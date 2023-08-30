import { ActionType, Tab, todoProps } from '../app/models/todo.interface';
import {
  ADD_TODO,
  CHANE_TAB,
  CLEAR_COMPLETED,
  DELETE_TODO,
  UPDATE_TODO,
} from './type';

export const addTodo = (todo: todoProps): ActionType => {
  return {
    type: ADD_TODO,
    payload: {
      todo,
    },
  };
};

export const updateTodo = (todo: todoProps): ActionType => {
  return {
    type: UPDATE_TODO,
    payload: {
      todo,
    },
  };
};

export const deleteTodo = (id: string): ActionType => {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  };
};

export const changeTab = (newTab: Tab) => {
  return {
    type: CHANE_TAB,
    payload: {
      tab: newTab,
    },
  };
};

