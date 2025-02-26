'use client'
import { configureStore } from '@reduxjs/toolkit';

// slices
import * as base from './base.slice';


const reducers = {
	base: base.default,
};

const actions = {
	...base,
	default: ''
};


export default configureStore({
	reducer: { ...reducers }
})

export {
	reducers,
	actions
};