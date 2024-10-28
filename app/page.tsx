'use client'

import { EmptyState } from '@/components/EmptyState'
import JobCard from '@/components/Job/Card'
import { Skeleton } from '@/components/Skeleton'
import { JOB_FILTERS } from '@/lib/config'
import { useJob } from '@/lib/hooks/useJob'
import { Box, Button, Container, Flex, Grid, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { HiColorSwatch } from 'react-icons/hi'
import { BiChevronDown, BiPlus } from 'react-icons/bi'

const Page = () => {
    const { jobs, filter, isFetching, setJobFilter } = useJob()

    const router = useRouter()

    return (
        <Container maxW="1200px" p="10px" id="job-list-container">
            <Flex alignItems="center" justifyContent="space-between" mt="2rem" mb="1rem">
                <Text fontSize="2rem" fontFamily="poppins" fontWeight="medium">
                    Jobs
                </Text>

                <Flex gap="10px" alignItems="center">
                    <Box position="relative">
                        <MenuRoot onSelect={(e) => setJobFilter(e.value)}>
                            <MenuTrigger asChild>
                                <Button variant="outline" size="xs" background="white" outline="unset">
                                    <Text fontFamily="poppins" fontSize=".9rem">
                                        {filter}
                                    </Text>
                                    <BiChevronDown color="#1d3632" />
                                </Button>
                            </MenuTrigger>
                            <MenuContent position="absolute" right="0" width="120px">
                                {JOB_FILTERS.map((item, i) => {
                                    return (
                                        <MenuItem value={item} key={i}>
                                            <Text fontSize=".7rem" flex="1">
                                                {item}
                                            </Text>
                                        </MenuItem>
                                    )
                                })}
                            </MenuContent>
                        </MenuRoot>
                    </Box>
                    <Button outline="unset" background="#549285" size="xs" variant="solid" pr="13px" onClick={() => router.push('/create')} id="create-job-btn">
                        <BiPlus color="white" />
                        <Text fontFamily="poppins" fontSize=".9rem">
                            Create Job
                        </Text>
                    </Button>
                </Flex>
            </Flex>

            {isFetching && jobs.length === 0 ? (
                <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }} gap={[6, 10]}>
                    <Skeleton height="187.44px" />
                    <Skeleton height="187.44px" />
                    <Skeleton height="187.44px" />
                </Grid>
            ) : jobs.length === 0 ? (
                <EmptyState icon={<HiColorSwatch />} title="No results found" description="Try adjusting your search criteria." fontFamily="poppins" />
            ) : (
                <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }} gap={[6, 10]}>
                    {jobs.map((item, i) => (
                        <JobCard data={item} key={i} redirect />
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default Page
