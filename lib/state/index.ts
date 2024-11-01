import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import job from './job/reducer'

const store = configureStore({
    reducer: {
        job,
    },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
