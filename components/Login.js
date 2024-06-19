"use client"

import { ChatIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Stack } from "@chakra-ui/react"

export default function Login() {
  return (
    <>
      <Center h="100vh">
        <Stack
          align="center"
          bgColor="gray.600"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            boxShadow="md"
            rounded="3xl"
          >
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>
          <Button boxShadow="md">Sign In with Google</Button>
        </Stack>
      </Center>
    </>
  )
}
