"use client"

import { auth, db } from "@/firebaseconfig"
import { ArrowLeftIcon } from "@chakra-ui/icons"
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, addDoc } from "@firebase/firestore"
import getOtherEmail from "@/utils/getOtherEmail"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [snapshot, loading, error] = useCollection(collection(db, "chats"))

  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    )
  const newChat = async () => {
    const input = prompt("Enter email of chat recipient")
    if (!chatExists(input) && input !== user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] })
    }
  }

  const redirect = (id) => {
    router.push(`/chat/${id}`)
  }

  const Chat = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          align="center"
          p={3}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ))
  }

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
          <Avatar src={user?.photoURL} marginEnd={3} />
          <Text>{user?.displayName}</Text>
        </Flex>
        <IconButton
          icon={<ArrowLeftIcon />}
          size="sm"
          isRound
          onClick={() => signOut(auth)}
        />
      </Flex>
      <Button m={5} p={4} onClick={() => newChat()}>
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
