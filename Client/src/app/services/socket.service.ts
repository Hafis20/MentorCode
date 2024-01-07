import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    const config: SocketIoConfig = {
      url: 'http://localhost:7000',
      options: {},
    };
    this.socket = io(config.url, config.options);

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
    });
  }

  // Mentor Joining the room
  mentorJoinRoom(data: { email: string; room: string }) {
    if (this.socket) {
      this.socket.emit('mentor-room:join', data);
    }
  }

  // Mentee joining the room
  menteeJoinRoom(data: { email: string; room: string }) {
    if (this.socket) {
      this.socket.emit('mentee-room:join', data);
    }
  }

  // If user joined in the room
  onUserJoined(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('user:joined', (data: any) => {
        // console.log(data, 'Joined');
        observer.next(data);
      });
      this.socket.off('user:joined', (data: any) => {});
    });
  }

  // call from mentor to mentee
  emitUserCall(data:{to:string,offer:any}):void{
    if(this.socket){
      console.log(`Mentor emited the call:`,data);
      this.socket.emit("user:call",data);
    }
  }

  // Listening for incomming call event
  onIncommingCall():Observable<any>{
    return new Observable(observer=>{
      this.socket.on("incoming:call",(data:any)=>{
        observer.next(data);
      })
    })
  }

  // Emitting call accepting
  emitCallAccepted(data: { to: string, ans: any }) :void{
    if (this.socket) {
      // Accepted the call      
      this.socket.emit('call:accepted', { data })
    }
  }

  // Listening the call accepted event
  listenCallAccepted():Observable<any>{
    return new Observable(observer=>{
      this.socket.on('call:accepted',(data:any)=>{
        observer.next(data);
      })
    })
  }

  // Peer negotiation needed
  emitNegotiationNeeded(data:{offer:any,to:string}){
    this.socket.emit('peer:nego:needed',data);
  }

  // Listening the nego needed
  listenNegoNeeded():Observable<any>{
    return new Observable(observer =>{
      this.socket.on('peer:nego:needed',data=>{
        observer.next(data);
      })
    })
  }
  // Emit nego done
  emitNegotiationDone(data:{to:string,ans:any}){
    this.socket.emit('peer:nego:done',data);
  }

  // Listening the nego final
  listenToNegoFinal():Observable<any>{
    return new Observable(observer=>{
      this.socket.on('peer:nego:final',(data:any)=>{
        observer.next(data);
      })
    })
  }

  // Emit disconnect
  emitDisconnect(data:{to:string}):void{
    if(this.socket){
      this.socket.emit('disconnect:call',data);
    }
  }
}
