import { useEffect, useState } from 'react'
import { useJobState } from '../state/job/hooks'
import { JOB_FILTER_ENUM, JobInterface } from '@/types/config'
import { toaster } from '@/components/Toaster'
import { useRouter } from 'next/navigation'

const getQueryFilter = (filter: string) => {
    if (filter === JOB_FILTER_ENUM.activeJobs) return 'showActive=true'
    if (filter === JOB_FILTER_ENUM.endedJobs) return 'showEnded=true'

    return ''
}

export const useJob = () => {
    const [jobs, filter, setJobFilter, setJobList] = useJobState()
    const router = useRouter()

    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    useEffect(() => {
        loadJobList()
    }, [filter])

    const loadJobList = async () => {
        try {
            setIsFetching(true)
            const api = await fetch(`/api/job?${getQueryFilter(filter)}`)
            const resp = await api.json()

            const { data, error } = resp

            if (error) return console.log(`Error while fetching Job list: ${error}`)

            setJobList(data)
        } catch (error) {
            console.log(`[Catch] Error while fetching Job list: ${error}`)
        } finally {
            setIsFetching(false)
        }
    }

    const viewJob = async (id: string) => {
        try {
            const api = await fetch(`/api/job/${id}`)
            const resp = await api.json()

            const { data, error } = resp

            if (data) return data

            toaster.create({
                title: 'Cannot find the Job post',
                type: 'error',
            })
            console.log(`Error while fetching Job list: ${error}`)
            router.push('/')
        } catch (error) {
            console.log(`[Catch] Error while fetching Job list: ${error}`)
        }
    }

    const submitJob = async (job: JobInterface) => {
        try {
            setIsCreating(true)
            const api = await fetch(`/api/job`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(job),
            })
            const resp = await api.json()

            const { data, error } = resp

            if (error) {
                toaster.create({
                    title: 'Error',
                    description: error,
                    type: 'error',
                })
            }

            if (data) {
                toaster.create({
                    title: 'Job Post Saved',
                    type: 'success',
                    duration: 5000,
                })
            }
        } catch (error) {
            toaster.create({
                title: 'Error occured',
                type: 'error',
            })
            console.log(`[Catch] Error while saving Job: ${error}`)
        } finally {
            setIsCreating(false)
        }
    }

    const editJob = async (id: string, job: JobInterface) => {
        try {
            setIsUpdating(true)
            const api = await fetch(`/api/job/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(job),
            })
            const resp = await api.json()

            const { data, error } = resp

            if (error) {
                toaster.create({
                    title: 'Error Update',
                    description: error,
                    type: 'error',
                })
            }

            if (data) {
                toaster.create({
                    title: 'Job Post Updated',
                    type: 'success',
                    duration: 5000,
                })
            }
        } catch (error) {
            toaster.create({
                title: 'Error occured',
                type: 'error',
            })
            console.log(`[Catch] Error while updating Job: ${error}`)
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        jobs,
        filter,
        isFetching,
        isCreating,
        isUpdating,
        loadJobList,
        setJobFilter,
        viewJob,
        submitJob,
        editJob,
    }
}
