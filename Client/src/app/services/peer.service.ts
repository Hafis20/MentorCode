import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  peer!: RTCPeerConnection;
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:global.stun.twilio.com:3478',
          ],
        },
      ],
    });
  }

  // Get offer
  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      try {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      } catch (error) {
        console.error('Create Offer Error:', error);
        return undefined;
      }
    }
    return undefined;
  }

  // Get answer
  async getAnswer(offer: any): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
    return undefined;
  }

  async setLocalDescription(ans: any) {
    if (this.peer) {
      try {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        console.log('Remote description success');
      } catch (error) {
        console.error('Set Local Description error',error);
      }
    }else{
      console.log("peer connection not available");
    }
  }
}
