import {Component, OnInit} from '@angular/core';
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
  }

  decrement() {
    console.log("decrement");
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
