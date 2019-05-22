import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NamingService {

  constructor() { }

  static names: any = [
    {
      ip: '10.17.2.173',
      name: 'Sascha'
    },
    {
      ip: '10.17.2.111',
      name: 'Jan'
    },
    {
      ip: '10.17.2.132',
      name: 'Alexandru'
    },
    {
      ip: '10.17.2.156',
      name: 'Jens'
    },
    {
      ip: '10.17.2.109',
      name: 'Alex B.'
    },
    {
      ip: '10.17.2.208',
      name: 'Adolphe'
    },
    {
      ip: '10.17.2.207',
      name: 'Pietro'
    },
    {
      ip: '10.17.2.153',
      name: 'Eva'
    },
    {
      ip: '10.17.2.160',
      name: 'Peter'
    },
    {
      ip: '10.17.2.196',
      name: 'Andreas'
    },
    {
      ip: '10.17.2.102',
      name: 'Simon'
    },
    {
      ip: '10.17.2.167',
      name: 'Artjom'
    }
    ];

  /**
   * Get the user IP throught the webkitRTCPeerConnection
   * @param onNewIP {Function} listener function to expose the IP locally
   * @return undefined
   */
   getUserIP(onNewIP): void { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    // @ts-ignore
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
      }),
      noop = function() {},
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
      key;

    function iterateIP(ip) {
      if (!localIPs[ip]) onNewIP(NamingService.getName(ip));
      localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
      sdp.sdp.split('\n').forEach(function(line) {
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
      // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  }

  static getName(ip: string) {
    let name;
    for (let next of this.names) {
      console.log(`${next.ip} vs ${ip}`)
      if (next.ip == ip) {
        name = next.name;
        break;
      }
    }
    if (!name) name = ip;
    return name;
  }

}
