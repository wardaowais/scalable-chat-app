'use client'
import { useState } from "react";
import { useSocket } from "../context/socketProvider"

export default function Page(){
  const {sendMessege , messeges} = useSocket();
  const [messege, setMessege] = useState("");
  return (
   <div>
   
    <div>
      <input onChange={(e) => setMessege(e.target.value)} className="chat-input" type="text" placeholder="Enter your messege" />
      <button onClick={(e) => sendMessege(messege)}>Send</button>
    </div>
    <div>
      {messeges.map(e => <li>{e}</li>) }
    </div>

   </div>
  )
}