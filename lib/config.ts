import { JOB_FILTER_ENUM, JOB_TYPES_ENUM, NavigationMenuInterface, WORK_PLACE_TYPE_ENUM } from '@/types/config'

export const NAVIGATION_MENU: NavigationMenuInterface[] = [
    {
        name: 'Dashboard',
        link: '#',
        isExternal: false,
    },
    {
        name: 'Jobs',
        link: '#',
        isExternal: false,
    },
    {
        name: 'Candidates',
        link: '#',
        isExternal: false,
    },
    {
        name: 'Schedule',
        link: '#',
        isExternal: false,
    },
]

export const JOB_TYPES: string[] = Object.values(JOB_TYPES_ENUM)
export const WORK_PLACE_TYPE: string[] = Object.values(WORK_PLACE_TYPE_ENUM)
export const JOB_FILTERS: string[] = Object.values(JOB_FILTER_ENUM)
