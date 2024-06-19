"use client"

import { ArrowLeftIcon } from "@chakra-ui/icons"
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react"

const Chat = () => {
  return (
    <Flex _hover={{ bg: "gray.100", cursor: "pointer" }} align="center" p={3}>
      <Avatar src="" marginEnd={3} />
      <Text>user@gmail.com</Text>
    </Flex>
  )
}

export default function Sidebar() {
  return (
    <Flex
      // bg="blue.100"
      w="300px"
      h="100vh"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        h="81px"
        // bg="red.100"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p={3}
      >
        <Flex align="center">
          <Avatar src="" marginEnd={3} />
          <Text>Albert Einstein</Text>
        </Flex>
        <IconButton icon={<ArrowLeftIcon />} size="sm" isRound />
      </Flex>
      <Button m={5} p={4}>
        New Chat
      </Button>
      <Flex
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
      >
        <Chat />
      </Flex>
    </Flex>
  )
}
