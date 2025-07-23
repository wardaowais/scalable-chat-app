import { Server } from "socket.io";
import Redis from 'ioredis'

const pub = new Redis({
  host : 'redis-14282.c16.us-east-1-2.ec2.redns.redis-cloud.com',
  port : 14282,
  username : 'default',
  password : 'e5ogBXnOjEJNndkV1TNKtglk3jprpXyl',

})
const sub = new Redis({
  
  host : 'redis-14282.c16.us-east-1-2.ec2.redns.redis-cloud.com',
  port : 14282,
  username : 'default',
  password : 'e5ogBXnOjEJNndkV1TNKtglk3jprpXyl',
})


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
    //This code is for subscribing 
    sub.subscribe('MESSEGES')

  }

  public initListener(){

    const io = this.io;
    console.log('Initialized Socket Listener...')

    //here is our event and messege sending code
    io.on("connect",(socket)=>{
      console.log(`New Socket Connected `, socket.id);
      socket.on('event:messege', async ({messege}: {messege : string})=>{
        console.log("New Message Received", messege);

        //publish this messege to redis
        await pub.publish('MESSEGES', JSON.stringify({messege}) )

      })
    })
 

    sub.on('message', async(channel , messege )=>{
      if(channel === 'MESSEGES') {
        console.log('new messege from redis ', messege)
        io.emit("messege", messege)
      }
    }
  )
    

  }

  get io() {
    return this._io;
  }
}

export default SocketService;