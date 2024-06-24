import { db } from "@/firebaseconfig"
import { Button, FormControl, Input } from "@chakra-ui/react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"

const Bottombar = ({ id, user }) => {
  const [input, setInput] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    })
    setInput("")
  }

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <Input
        placeholder="Type a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        value={input}
        autoFocus
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  )
}
export default Bottombar
