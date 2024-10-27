'use client'

import JobPreview from '@/components/Job/Preview'
import { useJob } from '@/lib/hooks/useJob'
import { getCompanyImage } from '@/lib/utils/getCompanyImage'
import { JobInterface } from '@/types/config'
import { Box, Container, Flex, Image, Tabs, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'

const Page = ({ params }: { params: { job: string } }) => {
    const { job } = params
    const { viewJob } = useJob()
    const [details, setDetails] = useState<JobInterface | null>(null)

    useEffect(() => {
        ;(async () => {
            setDetails(await viewJob(job))
        })()
    }, [])

    return (
        <>
            <Box bg="#eef3f1" py="20px">
                <Container maxW="1200px" p="10px">
                    <Link href="/">
                        <Flex alignItems="center">
                            <BiChevronLeft size={25} />
                            <Text fontFamily="poppins" fontSize=".9rem" fontWeight="medium" mt="2px" ml="10px">
                                Back to Job List
                            </Text>
                        </Flex>
                    </Link>
                    {details ? (
                        <Box mt="40px">
                            <Box height="50px" mb="10px">
                                <Image src={getCompanyImage(details.company)} alt={details.company} display="block" height="100%" objectFit="unset" />
                            </Box>
                            <Text fontSize="2rem" fontFamily="poppins" fontWeight="medium">
                                {details.title}
                            </Text>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Container>
            </Box>

            <Tabs.Root defaultValue="description" mt="1.2rem">
                <Tabs.List height="2.1rem" minHeight="unset">
                    <Flex m="auto" w="100%" maxW="1200px" px="10px" display="Flex" gap="2rem">
                        <Tabs.Trigger
                            value="description"
                            fontFamily="poppins"
                            fontSize=".8rem"
                            p="0"
                            _selected={{ color: '#549285', '--indicator-offset-y': '6px', '--indicator-thickness': '4px', '--indicator-color': '#549285' }}
                        >
                            Job Description
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="candidates"
                            fontFamily="poppins"
                            fontSize=".8rem"
                            p="0"
                            _selected={{ color: '#549285', '--indicator-offset-y': '6px', '--indicator-thickness': '4px', '--indicator-color': '#549285' }}
                        >
                            Candidates
                        </Tabs.Trigger>
                    </Flex>
                </Tabs.List>

                <Container maxW="1200px" p="10px">
                    <Tabs.Content value="description">{details ? <JobPreview data={details} /> : <></>}</Tabs.Content>
                    <Tabs.Content value="candidates">Candidates</Tabs.Content>
                </Container>
            </Tabs.Root>
        </>
    )
}

export default Page
