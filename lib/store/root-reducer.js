import { combineReducers } from '@reduxjs/toolkit';
import { categories } from './slices/category.slice';

export const rootReducer = combineReducers({
    categories: categories
})