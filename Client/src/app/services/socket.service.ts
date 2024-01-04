import { Injectable } from '@angular/core';
import { io, Socket} from 'socket.io-client';
import { SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  private socket:Socket;

  constructor() { 
    const config: SocketIoConfig = { url: 'http://localhost:7000', options: {} };
    this.socket = io(config.url, config.options);

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
  
    this.socket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
    });
  }

  // Mentor Joining the room
  mentorJoinRoom(data:{email:string,room:string}){
    if(this.socket){
      this.socket.emit('room:join',data);
    }
  }
}
