import { JobInterface } from '@/types/config'
import { createAction } from '@reduxjs/toolkit'

export const updateJobList = createAction<JobInterface[]>('job/updateJobList')
export const updateJobFilter = createAction<string>('job/updateJobFilter')
