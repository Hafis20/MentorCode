import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

const mediaConstraints = {
  audio:true,
  video:{
    width:720,
    height:540
  }
};

@Component({
  selector: 'app-video-chat-mentor',
  templateUrl: './video-chat-mentor.component.html',
  styleUrls: ['./video-chat-mentor.component.css']
})
export class VideoChatMentorComponent implements AfterViewInit{

  private localStream!: MediaStream;
  @ViewChild('local_video') localVideo!:ElementRef;
  @ViewChild('received_video') remoteVideo!:ElementRef;

  constructor(){}

  ngAfterViewInit(): void {
    this.requestMediaDevices();
  }

  private async requestMediaDevices():Promise<void>{
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.pauseLocalVideo();
  }

  pauseLocalVideo():void{
    this.localStream.getTracks().forEach(track=>{
      track.enabled = false;
    })
    this.localVideo.nativeElement.srcObject = undefined;
  }

  startLocalVideo():void{
    this.localStream.getTracks().forEach(track=>{
      track.enabled = true;
    })
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  
}
