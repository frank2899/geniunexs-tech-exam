import { Box, Card, Text } from '@chakra-ui/react'
import moment from 'moment'

interface JobDetailsInteface {
    activeUntil: string | Date
    department: string
    jobType: string
    location: string
    workLocationType: string
}

const JobDetails = ({ activeUntil, department, jobType, location, workLocationType }: JobDetailsInteface) => {
    return (
        <Card.Root variant="outline" cursor="pointer" minW="330px" bg="white">
            <Card.Body p="1rem">
                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold">
                    Active Until
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="10px">
                    {moment(activeUntil).format('MMM DD, YYYY')}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold">
                    Department
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="10px">
                    {department}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold">
                    Job Type
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="10px">
                    {jobType}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold">
                    Location
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="10px">
                    {location}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold">
                    Workplace Type
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem">
                    {workLocationType}
                </Text>
            </Card.Body>
        </Card.Root>
    )
}

export default JobDetails
