import { AfterViewInit, Component } from '@angular/core';

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

  constructor(){}

  ngAfterViewInit(): void {
    this.requestMediaDevices();
  }

  private async requestMediaDevices():Promise<void>{
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints) 
  }
}
