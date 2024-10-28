'use client'

import { Field } from '@/components/Field'
import { NativeSelectField } from '@/components/NativeSelect'
import { JOB_TYPES, WORK_PLACE_TYPE } from '@/lib/config'
import {
    Link as ChakraLink,
    Box,
    Container,
    Fieldset,
    Flex,
    Input,
    NativeSelectRoot,
    Text,
    Button,
    chakra,
    useRecipe,
    Image,
    Spinner,
    VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { BiChevronLeft } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import AutoResize from 'react-textarea-autosize'
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from '@/components/Dialog'
import { useEffect, useState } from 'react'
import JobCard from '@/components/Job/Card'
import { JobInterface } from '@/types/config'
import { Prose } from '@/components/Prose'
import Markdown from 'react-markdown'
import JobDetails from '@/components/Job/Details'
import { COMPANY_MOCKUP } from '@/__mockup__/company'
import { getCompanyImage } from '@/lib/utils/getCompanyImage'
import { useJob } from '@/lib/hooks/useJob'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const StyledAutoResize = chakra(AutoResize)

interface JobFormInputs {
    company: string
    title: string
    summary: string
    activeUntil: string
    description: string
    department: string
    jobType: string
    location: string
    workLocationType: string
}

const Page = ({ params }: { params: { job: string } }) => {
    const { job } = params
    const router = useRouter()
    const { editJob, isUpdating, viewJob } = useJob()
    const [details, setDetails] = useState<JobInterface | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<JobFormInputs>()
    const [previewData, setPreviewData] = useState<JobInterface | null>(null)

    const validateNotEmpty = (value: string) => value.trim().length > 0 || 'This field cannot be empty'

    const textAreaRecipe = useRecipe({ key: 'textarea' })
    const textAreaAutoResizeStyles = textAreaRecipe({ size: 'sm' })

    const fetchData = async () => {
        const fetchedDetails = await viewJob(job)
        setDetails(fetchedDetails)
        if (fetchedDetails) {
            reset({
                company: fetchedDetails.company,
                title: fetchedDetails.title,
                summary: fetchedDetails.summary,
                activeUntil: moment(fetchedDetails.activeUntil).format('YYYY-MM-DD'),
                description: fetchedDetails.description,
                department: fetchedDetails.department,
                jobType: fetchedDetails.jobType,
                location: fetchedDetails.location,
                workLocationType: fetchedDetails.workLocationType,
            })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onSubmit = (data: JobFormInputs) => {
        console.log('Form data:', data)
        setPreviewData(data)
        setIsOpen(true)
    }

    const handleSave = async () => {
        if (previewData) {
            await editJob(job, previewData)
            router.push(`/${job}`)
        }
        reset()
        setIsOpen(false)
    }

    return (
        <DialogRoot motionPreset="slide-in-top" open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <Box bg="#eef3f1" py="20px">
                <Container maxW="1200px" p="10px">
                    <Link href={`/${job}`}>
                        <Flex alignItems="center">
                            <BiChevronLeft size={25} />
                            <Text fontFamily="poppins" fontSize=".9rem" fontWeight="medium" mt="2px" ml="10px">
                                Go Back
                            </Text>
                        </Flex>
                    </Link>

                    <Box mt="40px">
                        <Text fontSize="2rem" fontFamily="poppins" fontWeight="medium">
                            Edit Job
                        </Text>
                    </Box>
                </Container>
            </Box>

            {isLoading ? (
                <VStack mt="3rem">
                    <Spinner color="#1d3632" size="lg" />
                    <Text color="#1d3632" fontFamily="poppins">
                        Loading...
                    </Text>
                </VStack>
            ) : (
                details && (
                    <Container maxW="1200px" p="10px" mt="1.2rem" mb="2rem">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset.Root size="lg">
                                <Fieldset.Legend>Job details</Fieldset.Legend>
                                <Fieldset.Content>
                                    <Field label="Company" required errorText={errors.company?.message}>
                                        <NativeSelectRoot>
                                            <NativeSelectField
                                                {...register('company', {
                                                    required: 'Company is required',
                                                })}
                                                items={COMPANY_MOCKUP}
                                            />
                                        </NativeSelectRoot>
                                    </Field>
                                    <Field label="Title" required errorText={errors.title?.message}>
                                        <Input
                                            {...register('title', {
                                                required: 'Title is required',
                                                validate: validateNotEmpty,
                                            })}
                                        />
                                    </Field>
                                    <Field
                                        label="Summary"
                                        required
                                        errorText={errors.summary?.message}
                                        helperText="Provide a brief overview of the job role and key responsibilities in 1-2 sentences. This should capture the main purpose of the role to attract the right candidates."
                                    >
                                        <Input
                                            {...register('summary', {
                                                required: 'Summary is required',
                                                validate: validateNotEmpty,
                                            })}
                                        />
                                    </Field>
                                    <Field label="Active Until" required errorText={errors.activeUntil?.message}>
                                        <Input type="date" {...register('activeUntil', { required: 'Active Until date is required' })} />
                                    </Field>
                                    <Field
                                        label="Description"
                                        required
                                        errorText={errors.description?.message}
                                        helperText={
                                            <>
                                                Use Markdown syntax for formatting. Check out the{' '}
                                                <ChakraLink
                                                    href="https://www.markdownguide.org/cheat-sheet/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    textDecor="underline"
                                                >
                                                    Markdown Guide
                                                </ChakraLink>
                                                .
                                            </>
                                        }
                                    >
                                        <StyledAutoResize
                                            {...register('description', {
                                                required: 'Description is required',
                                                validate: validateNotEmpty,
                                            })}
                                            css={textAreaAutoResizeStyles}
                                        />
                                    </Field>
                                    <Field label="Department" required errorText={errors.department?.message}>
                                        <Input
                                            {...register('department', {
                                                required: 'Department is required',
                                                validate: validateNotEmpty,
                                            })}
                                        />
                                    </Field>
                                    <Field label="Job Type" required errorText={errors.jobType?.message}>
                                        <NativeSelectRoot>
                                            <NativeSelectField
                                                {...register('jobType', {
                                                    required: 'Job Type is required',
                                                })}
                                                items={JOB_TYPES}
                                            />
                                        </NativeSelectRoot>
                                    </Field>
                                    <Field label="Location" required errorText={errors.location?.message}>
                                        <Input
                                            {...register('location', {
                                                required: 'Location is required',
                                                validate: validateNotEmpty,
                                            })}
                                        />
                                    </Field>
                                    <Field label="Workplace Type" required errorText={errors.workLocationType?.message}>
                                        <NativeSelectRoot>
                                            <NativeSelectField
                                                {...register('workLocationType', {
                                                    required: 'Workplace Type is required',
                                                })}
                                                items={WORK_PLACE_TYPE}
                                            />
                                        </NativeSelectRoot>
                                    </Field>

                                    <Button type="submit" size="lg" mt="4" fontFamily="poppins" disabled={isUpdating} id="save-btn">
                                        {isUpdating ? 'Saving...' : 'Submit'}
                                    </Button>
                                </Fieldset.Content>
                            </Fieldset.Root>
                        </form>
                    </Container>
                )
            )}

            <DialogContent maxWidth="1000px" bg="#fafafa">
                <DialogHeader>
                    <DialogTitle fontFamily="poppins">Job Update Preview</DialogTitle>
                </DialogHeader>
                <DialogBody id="job-update-preview">
                    <Box mb="30px">
                        <Box height="50px" mb="10px">
                            {previewData?.company ? (
                                <Image src={getCompanyImage(previewData.company)} alt={previewData.company} display="block" height="100%" objectFit="unset" />
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Text fontSize="2rem" fontFamily="poppins" fontWeight="medium">
                            {previewData?.title}
                        </Text>
                    </Box>

                    <Text fontFamily="poppins" fontWeight="500" fontSize="1rem">
                        Position Overview
                    </Text>

                    <Flex gap="1rem" justifyContent="space-between" flexDir={['column', 'column', 'row']}>
                        <Prose fontFamily="poppins" m="0" fontSize=".8rem">
                            <Markdown>{previewData?.description}</Markdown>
                        </Prose>
                        <Box my="1rem">
                            {previewData ? (
                                <JobDetails
                                    activeUntil={previewData.activeUntil}
                                    department={previewData.department}
                                    jobType={previewData.jobType}
                                    location={previewData.location}
                                    workLocationType={previewData.workLocationType}
                                />
                            ) : (
                                <Text fontWeight="italic">Cannot Job Details Due to an Error</Text>
                            )}
                            {previewData ? (
                                <Box maxWidth="400px" width="100%" mt="1rem">
                                    <JobCard data={previewData} />
                                </Box>
                            ) : (
                                <Text fontWeight="italic">Cannot Display Card Preview Due to an Error</Text>
                            )}
                        </Box>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} ml={3} disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save Job'}
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}

export default Page
