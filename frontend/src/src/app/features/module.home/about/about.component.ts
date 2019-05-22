import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {About} from '$api/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
    console.log(1);
  }

  counter: number = 0;

  message: About;

  messages: About[] = [
    { isImg: true,
      img: 'assets/angular.png'
    },
    { isImg: false,
      text: 'Portal'
    },
    { isImg: false,
      text: 'written by'
    },
    { isImg: false,
      text: 'Portal team'
    },
    { isImg: false,
      text: 'Techn. stack'
    },
    { isImg: true,
      img: 'assets/angular.png'
    },
    { isImg: true,
      img: 'assets/bootstrap.png'
    },
    { isImg: true,
      img: 'assets/springboot.png'
    },
    { isImg: true,
      img: 'assets/spring.png'
    },
    { isImg: true,
      img: 'assets/keycloak.png'
    },
    { isImg: true,
      img: 'assets/nodejs.png'
    },
    { isImg: true,
      img: 'assets/npm.png'
    },
    { isImg: true,
      img: 'assets/docker3.png',
      imgWidth: 150
    },
    { isImg: true,
      img: 'assets/kubernetes.png'
    },
    { isImg: false,
      text: '(c) 2019'
    },
    { isImg: false,
      text: 'that\'s all'
    },
    { isImg: false,
      text: 'bye'
    }
  ];

  ngOnInit() {
    this.subs = timer(0, 1500).subscribe(_=>{
    this.message = this.messages[this.counter % this.messages.length];
    this.cdr.detectChanges();
    this.counter += 1;
  });

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
