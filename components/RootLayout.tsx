import { NAVIGATION_MENU } from '@/lib/config'
import { Box, Container, Flex, Link as ChakraLink, Button, MenuRoot, MenuTrigger, MenuContent, MenuItem, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { BiPlus, BiBell, BiEnvelope, BiChevronDown } from 'react-icons/bi'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <Box bg="#1d3632">
                <Container w="100%" maxW="1200px" p="10px" display="flex" justifyContent="space-between" alignItems="center">
                    <Flex gap="1.5rem" alignItems="center">
                        <Box borderRadius="50%" width="35px" height="35px" bg="#aec1c4" mr="20px" />
                        {/* isExternal Attribute is not yet Implemented */}
                        {NAVIGATION_MENU.map((items, i) => {
                            return (
                                <ChakraLink key={i} color="white" fontFamily="poppins" fontSize=".9rem" as={Link} href={items.link}>
                                    {items.name}
                                </ChakraLink>
                            )
                        })}
                    </Flex>

                    <Flex alignItems="center">
                        <Button variant="plain" p="0">
                            <BiPlus color="white" fontSize="1.3rem" />
                        </Button>
                        <Box position="relative">
                            <MenuRoot>
                                <MenuTrigger asChild>
                                    <Button variant="plain" p="0" outline="unset">
                                        <BiEnvelope color="white" fontSize="1.3rem" />
                                    </Button>
                                </MenuTrigger>
                                <MenuContent position="absolute" right="0" width="150px">
                                    <MenuItem value="empty">
                                        <Text fontSize=".7rem" textAlign="center" flex="1">
                                            No Messages found
                                        </Text>
                                    </MenuItem>
                                </MenuContent>
                            </MenuRoot>
                        </Box>
                        <Box position="relative">
                            <MenuRoot>
                                <MenuTrigger asChild>
                                    <Button variant="plain" p="0" outline="unset">
                                        <BiBell color="white" fontSize="1.3rem" />
                                    </Button>
                                </MenuTrigger>
                                <MenuContent position="absolute" right="0" width="150px">
                                    <MenuItem value="empty">
                                        <Text fontSize=".7rem" textAlign="center" flex="1">
                                            No Notifications found
                                        </Text>
                                    </MenuItem>
                                </MenuContent>
                            </MenuRoot>
                        </Box>
                        <Box position="relative" ml="15px">
                            <MenuRoot>
                                <MenuTrigger asChild>
                                    <Button variant="plain" p="0" outline="unset">
                                        <Box
                                            borderRadius="50%"
                                            width="45px"
                                            height="45px"
                                            backgroundImage="url('https://images.pexels.com/photos/17464319/pexels-photo-17464319/free-photo-of-girl-with-braided-hair-and-wreath-holding-a-book-in-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
                                            backgroundPosition="center"
                                            backgroundSize="cover"
                                        />
                                        <Text fontFamily="poppins" fontSize=".9rem" color="white">
                                            Jane Doe
                                        </Text>
                                        <BiChevronDown color="#aec1c4" />
                                    </Button>
                                </MenuTrigger>
                                <MenuContent position="absolute" right="0" width="120px">
                                    <MenuItem value="empty">
                                        <Text fontSize=".7rem" flex="1">
                                            Profile
                                        </Text>
                                    </MenuItem>
                                    <MenuItem value="sign-out" color="fg.error" _hover={{ bg: 'bg.error', color: 'fg.error' }}>
                                        <Text fontSize=".7rem" flex="1">
                                            Sign out
                                        </Text>
                                    </MenuItem>
                                </MenuContent>
                            </MenuRoot>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            {children}
        </Box>
    )
}

export default RootLayout
