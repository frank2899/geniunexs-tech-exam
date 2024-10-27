import { JOB_TYPES_ENUM, JobInterface, WORK_PLACE_TYPE_ENUM } from '@/types/config'
import { PaginateModel, Schema, model, Document, models } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

interface IJob_ extends JobInterface {
    dateCreated: Date
}

interface IJob extends IJob_ {}

const jobSchema = new Schema<IJob>({
    company: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    activeUntil: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPES_ENUM),
    },
    location: {
        type: String,
        required: true,
    },
    workLocationType: {
        type: String,
        enum: Object.values(WORK_PLACE_TYPE_ENUM),
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

jobSchema.plugin(mongoosePaginate)

export const JobModel = models.job || model<IJob, PaginateModel<IJob>>('job', jobSchema)
