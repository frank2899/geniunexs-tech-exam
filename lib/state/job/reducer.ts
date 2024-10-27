import { createReducer } from '@reduxjs/toolkit'
import { updateJobList, updateJobFilter } from './actions'
import { JOB_FILTER_ENUM, JobInterface } from '@/types/config'

export interface JobState {
    jobs: JobInterface[]
    filter: string
}

export const initialState: JobState = {
    jobs: [],
    filter: JOB_FILTER_ENUM.activeJobs,
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateJobList, (state, { payload }) => {
            state.jobs = payload
        })
        .addCase(updateJobFilter, (state, { payload }) => {
            state.filter = payload
        }),
)
