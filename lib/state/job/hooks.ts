import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { AppDispatch, AppState } from '..'
import { updateJobList, updateJobFilter } from './actions'
import { JobInterface } from '@/types/config'

type JobState = [JobInterface[], string, (payload: string) => void, (payload: JobInterface[]) => void]

export const useJobState = (): JobState => {
    const dispatch = useDispatch<AppDispatch>()
    const jobs = useSelector<AppState, AppState['job']['jobs']>((state) => state.job.jobs)
    const filter = useSelector<AppState, AppState['job']['filter']>((state) => state.job.filter)

    const setJobList = useCallback(
        (payload: JobInterface[]) => {
            dispatch(updateJobList(payload))
        },
        [jobs, dispatch],
    )

    const setJobFilter = useCallback(
        (payload: string) => {
            dispatch(updateJobFilter(payload))
        },
        [filter, dispatch],
    )

    return [jobs, filter, setJobFilter, setJobList]
}
