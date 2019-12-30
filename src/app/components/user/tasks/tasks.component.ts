import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';

import {DadataService, DadataType} from '../../../services/dadata.service';
import {DadataSuggestion} from '../../../model/dadata/suggestion';
import {Subject, timer} from 'rxjs';
import {DadataResponse} from '../../../model/dadata/dadata-response';
import {debounce} from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private value: any = '';
  data: DadataSuggestion[] = [];
  private address: DadataSuggestion = null;
  currentFocus = -1;
  @Output() selectedSuggestion: DadataSuggestion;
  // @ts-ignore
  @ViewChild('inputValue', {static: true}) inputValue: ElementRef;
  public inputString$ = new Subject<string>();
  public inputStringFio$ = new Subject<string>();

  constructor(private dataService: DadataService) {
  }

  ngOnInit() {
    console.log('ngOnInit working');
    this.getAddress();
    this.getFio();
  }
  getData(value: string) {
    console.log('getData Method - ', value);
    this.inputString$.next(value);
    this.currentFocus = -1;
  }

  onClick(e: MouseEvent, item: DadataSuggestion) {
    console.log('onClick Start', e);
    this.inputValue.nativeElement.value = item.value;
    this.inputValue.nativeElement.focus();
    this.selectedSuggestion = item;
    this.data = [];
    this.currentFocus = -1;
    this.address = item;
    console.log('OnClick - this.address', this.address);
    // console.log('onClick DadataSuggestion', item);
  }

  onEnter() {
    console.log('onEnterMethod start');
  }

  private getAddress() {
    this.inputString$.pipe(
      debounce(() => timer(500)),
    ).subscribe(x => {
      this.dataService.getData(x, DadataType.address).subscribe((y: DadataResponse) => {
        this.data = y.suggestions;
        // console.log('ngOnInit - inputString ', this.inputString$);
      });
    });
  }

  private getFio() {
    this.inputStringFio$.pipe(
      debounce(() => timer(500)),
    ).subscribe(x => {
      this.dataService.getData(x, DadataType.fio).subscribe((y: DadataResponse) => {
        this.data = y.suggestions;
        // console.log('ngOnInit - inputString ', this.inputString$);
      });
    });
  }
  // [value]="address ? '' : address.data.city"
}
