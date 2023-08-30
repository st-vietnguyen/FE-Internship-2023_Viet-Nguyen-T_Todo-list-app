import { createStore } from 'redux';
import { todoListReducer } from './reducer';

export default createStore(todoListReducer);
