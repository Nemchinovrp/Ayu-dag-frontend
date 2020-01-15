import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DadataService} from '../../../services/dadata.service';
import {UserService} from '../../../services/user.service';
// @ts-ignore
import {Hotel} from '../../../model/Hotel';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  counterValue: Number = 0;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Ялта'},
    {value: 'pizza-1', viewValue: 'Севастополь'},
    {value: 'tacos-2', viewValue: 'Симферополь'}
  ];
  inputs: any;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  increment() {
    console.log("increment");
    // @ts-ignore
    console.log(this.counterValue = ++this.counterValue);
    console.log(this.counterValue);
  }

  decrement() {
    console.log("decrement");
    // @ts-ignore
    console.log(this.counterValue = --this.counterValue);
    console.log(this.counterValue);
  }

  myFunc() {
    console.log('method in component');
    this.userService.testBackend().subscribe((y : Hotel) => {
      console.log('into method in component');
      alert(y.name + y.description);
    })
  }

  numberInput(evt, val) {
    console.log(evt, val);
  }

}
