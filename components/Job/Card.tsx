import { getCompanyImage } from '@/lib/utils/getCompanyImage'
import { JobInterface } from '@/types/config'
import { Badge, Box, Card, Flex, Image, Text } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'

interface _ extends JobInterface {
    _id?: string
}

interface JobCardInterface {
    data: _
    redirect?: boolean
}

const JobCard = ({ redirect = false, data }: JobCardInterface) => {
    const { _id, company, title, summary, activeUntil, department, jobType, workLocationType } = data

    const isEnded = moment().isAfter(moment(activeUntil))
    const statusText = isEnded ? `Ended on: ${moment(activeUntil).format('MMM DD, YYYY')}` : `Active until: ${moment(activeUntil).format('MMM DD, YYYY')}`

    const router = useRouter()

    return (
        <Card.Root variant="outline" cursor="pointer" onClick={() => redirect && router.push(`/${_id}`)} className="job-card" data-job-id={_id}>
            <Card.Body px="10px" py="1rem">
                <Flex justifyContent="space-between" mb="15px">
                    <Box height="30px">
                        <Image src={getCompanyImage(company)} alt={company} display="block" height="100%" objectFit="unset" />
                    </Box>
                    <Box>
                        <Badge variant="outline" fontWeight="medium" borderRadius="100px" p="4px 8px" fontFamily="poppins" fontSize=".65rem">
                            {statusText}
                        </Badge>
                    </Box>
                </Flex>
                <Flex flexDirection="column" justifyContent="space-between">
                    <Box>
                        <Text lineClamp="1" fontSize=".9rem" fontFamily="poppins" fontWeight="medium" lineHeight="1.5" mb="2px">
                            {title}
                        </Text>
                        <Text height="46.83px" lineClamp="3" fontSize=".65rem" fontFamily="poppins" lineHeight="1.4">
                            {summary}
                        </Text>
                    </Box>
                    <Flex gap="8px" mt="1rem">
                        <Badge
                            variant="solid"
                            bg="#d8ecf7"
                            color="#3455b1"
                            fontWeight="medium"
                            borderRadius="100px"
                            p="4px 8px"
                            fontFamily="poppins"
                            fontSize=".8rem"
                        >
                            {department}
                        </Badge>
                        <Badge variant="outline" fontWeight="medium" borderRadius="100px" p="4px 8px" fontFamily="poppins" fontSize=".7rem">
                            {jobType}
                        </Badge>
                        <Badge variant="outline" fontWeight="medium" borderRadius="100px" p="4px 8px" fontFamily="poppins" fontSize=".7rem">
                            {workLocationType}
                        </Badge>
                    </Flex>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}

export default JobCard
