import {Component, OnInit} from '@angular/core';

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


  constructor() {
  }

  ngOnInit() {
  }

  numberInput(evt, val) {
    console.log(evt, val);
  }

}
