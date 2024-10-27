export interface NavigationMenuInterface {
    name: string
    link: string
    isExternal: boolean
}

export enum JOB_FILTER_ENUM {
    activeJobs = 'Active Jobs',
    endedJobs = 'Ended Jobs',
}

export enum JOB_TYPES_ENUM {
    contract = 'Contract',
    fulltime = 'Fulltime',
    intern = 'Intern',
}

export enum WORK_PLACE_TYPE_ENUM {
    onsite = 'Onsite',
    hybrid = 'Hybrid',
}

export interface JobInterface {
    _id?: string
    company: string
    summary: string
    title: string
    description: string
    activeUntil: Date | string
    department: string
    jobType: string
    location: string
    workLocationType: string
}
