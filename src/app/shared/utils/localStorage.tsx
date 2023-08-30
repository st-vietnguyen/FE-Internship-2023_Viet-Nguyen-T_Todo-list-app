import { todoProps } from '../../models/todo.interface';

export enum StorageKey {
  TODO_LIST = 'todoList',
}

export const getDataFromLocalStorage = (key: StorageKey): todoProps[] =>
  JSON.parse(localStorage.getItem(key) || '[]');

export function saveDataToLocalStorage(
  key: StorageKey,
  value: todoProps[]
): void {
  localStorage.setItem(key, JSON.stringify(value));
}
