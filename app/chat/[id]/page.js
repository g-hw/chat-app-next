"use client"

import Bottombar from "@/components/BottomBar"
import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import { auth, db } from "@/firebaseconfig"
import getOtherEmail from "@/utils/getOtherEmail"
import { Flex, Text } from "@chakra-ui/react"
import { collection, doc, orderBy, query } from "firebase/firestore"
import { useEffect, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore"

export default function Chat({ params }) {
  const { id } = params
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"))
  const [messages] = useCollectionData(q)
  const [user] = useAuthState(auth)
  const [chat] = useDocumentData(doc(db, "chats", id))
  const bottomOfChat = useRef(null)

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user?.email
      return (
        <Flex
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          alignSelf={sender ? "flex-start" : "flex-end"}
          p={3}
          m={1}
          key={Math.random()}
        >
          <Text>{msg.text}</Text>
        </Flex>
      )
    })

  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    )
  }, [messages])

  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />
        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>
        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  )
}
