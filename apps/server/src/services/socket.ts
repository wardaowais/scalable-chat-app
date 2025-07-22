import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("SocketServer initialized");
    this._io = new Server({
      cors : {
        allowedHeaders : ['*'],
        credentials : true,
        origin : '*'
      }
    });
  }

  public initListener(){

    const io = this.io;
    console.log('Initialized Socket Listener...')
    io.on("connect",(socket)=>{
      console.log(`New Socket Connected `, socket.id);
      socket.on('event:messege', async ({messege}: {messege : string})=>{
        console.log("New Message Received", messege);
      })
    })


  }

  get io() {
    return this._io;
  }
}

export default SocketService;