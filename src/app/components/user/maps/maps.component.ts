import {Component, OnDestroy, OnInit} from '@angular/core';
import {animationFrameScheduler, interval, Subscription} from 'rxjs';
import {observeOn} from 'rxjs/operators';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnDestroy{
  center = [0, 0];

  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.sub = interval(100).pipe(
      observeOn(animationFrameScheduler)
    ).subscribe(() => {
      if (this.center[0] >= 180) {
        this.center = [-this.center[0], 0];
      } else {
        this.center = [this.center[0] + 1, 0];
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
