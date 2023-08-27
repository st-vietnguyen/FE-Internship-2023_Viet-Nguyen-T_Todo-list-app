import { todoProps } from '../services/todo.interface';

export const getDataFromLocalStorage = (key: string): todoProps[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveDataToLocalStorage = (
  key: string,
  value: todoProps[]
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
