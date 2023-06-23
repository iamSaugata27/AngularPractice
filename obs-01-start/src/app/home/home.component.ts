import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, observable, Observer, Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   (count) => {
    //     console.log(count);
    //   })

    // custom observable
    const customObservable = new Observable(
      (observer: Observer<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count > 4)
            observer.error(new Error("Count Value has reached above 3"));
          if (count == 6)
            observer.complete();
          count++;
        }, 2000);
      });
    this.firstObsSubscription = customObservable.subscribe(
      (data) => console.log(data),
      (error) => {
        console.log(error);
        alert("Hi,Count Value has reached above 4");
      },
      () => console.log("Count Completed!")
    )
  }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
