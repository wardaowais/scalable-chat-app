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
  messeges : string[];
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
 const [socket, setSocket] = useState<Socket >();
 const [messeges , setMesseges] = useState<string[]>([])

  
  
  const sendMessege : ISocketContext['sendMessege'] = useCallback((msg)=>{
  console.log("Send Message to Server", msg);
   if (socket){
    socket.emit('event:messege', {messege : msg})

   }
  }, [socket]);

  const onMessegeRecieved = useCallback((msg : string) => {
    console.log('From Server Msg Recieve', msg);

    //Destructuring the messege and adding the previous messeges and new
    const {messege} = JSON.parse(msg) as {messege: string}
    setMesseges(prev => [...prev, messege]);

  }, []);
 
    useEffect(()=>{
    const _socket = io("http://localhost:8000");
    _socket.on('messege',onMessegeRecieved)
    setSocket(_socket)

    return () => {
      _socket.off('messege', onMessegeRecieved)
      _socket.disconnect();
      setSocket(undefined)
    };
    
  }, [])

  return (
    <SocketContext.Provider value={{sendMessege , messeges}}>
    {children}
    </SocketContext.Provider>
  );

};
