"use client"

import Login from "@/components/Login"
import Sidebar from "@/components/Sidebar"
import { auth } from "../firebaseconfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { Center, Spinner } from "@chakra-ui/react"

export default function Home() {
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }
  if (!user) {
    return <Login />
  }
  return <Sidebar />
}
