import { Card, Text } from '@chakra-ui/react'
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
                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold" mb="5px">
                    Active Until
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="15px">
                    {moment(activeUntil).format('MMM DD, YYYY')}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold">
                    Department
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="15px">
                    {department}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold" mb="5px">
                    Job Type
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="15px">
                    {jobType}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold" mb="5px">
                    Location
                </Text>
                <Text fontFamily="poppins" fontSize=".9rem" mb="15px">
                    {location}
                </Text>

                <Text color="#15211d" fontFamily="poppins" fontSize=".7rem" fontWeight="bold" mb="5px">
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
