"use client";
import React from "react";
import { useCallback } from "react";

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

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  
  const sendMessege : ISocketContext['sendMessege'] = useCallback((msg)=>{
  console.log("Send Message to Server", msg)
  }, [])

  return (
    <SocketContext.Provider value={{sendMessege}}>{children}</SocketContext.Provider>
  );

};
