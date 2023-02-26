import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger';
import { authMiddleware } from './middlewares/authMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(logger,authMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch