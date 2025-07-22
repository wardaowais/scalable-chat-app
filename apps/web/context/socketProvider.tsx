"use client";
import React, { useContext, useEffect , useState } from "react";
import { useCallback } from "react";
import { io , Socket } from "socket.io-client";
interface SocketProviderProps {
  children?: React.ReactNode;
}

// Define the type of data the context will hold
interface ISocketContext {
  sendMessege :(msg : string)=> any ;
}

export const SocketContext = React.createContext<ISocketContext | null>(
  null
);

export const useSocket = () =>{
  const state = useContext(SocketContext)
  if (!state) throw new Error("state is not defined")
  return state
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
 const [socket, setSocket] = useState<Socket >()
  useEffect(()=>{
    const _socket = io("http://localhost:8000");
    setSocket(_socket)

    return () => {
      _socket.disconnect();
      setSocket(undefined)
    };
    
  }, [])
  
  const sendMessege : ISocketContext['sendMessege'] = useCallback((msg)=>{
  console.log("Send Message to Server", msg)
  }, [])

  return (
    <SocketContext.Provider value={{sendMessege}}>{children}</SocketContext.Provider>
  );

};
