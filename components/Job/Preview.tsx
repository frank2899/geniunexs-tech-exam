import { JobInterface } from '@/types/config'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { BiEdit } from 'react-icons/bi'
import { Prose } from '../Prose'
import Markdown from 'react-markdown'
import JobDetails from './Details'
import { useRouter } from 'next/navigation'

const JobPreview = ({ data }: { data: JobInterface }) => {
    const { _id, description, activeUntil, department, jobType, location, workLocationType } = data

    const router = useRouter()

    return (
        <Box id="job-preview">
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontFamily="poppins" fontWeight="500" fontSize="1.5rem" mb="1rem">
                    Job Description
                </Text>

                <Button
                    outline="unset"
                    background="#549285"
                    size="xs"
                    variant="solid"
                    pr="13px"
                    onClick={() => router.push(`/update/${_id}`)}
                    id="update-job-btn"
                >
                    <BiEdit color="white" />
                    <Text fontFamily="poppins" fontSize=".9rem">
                        Edit
                    </Text>
                </Button>
            </Flex>

            <Text fontFamily="poppins" fontWeight="500" fontSize="1rem">
                Position Overview
            </Text>
            <Flex gap="1rem" justifyContent="space-between" flexDir={['column', 'column', 'row']}>
                <Prose fontFamily="poppins" m="0" fontSize=".8rem">
                    <Markdown>{description}</Markdown>
                </Prose>
                <Box my="1rem">
                    <JobDetails activeUntil={activeUntil} department={department} jobType={jobType} location={location} workLocationType={workLocationType} />
                </Box>
            </Flex>
        </Box>
    )
}

export default JobPreview
