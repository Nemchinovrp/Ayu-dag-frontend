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
  public value: any = '';
  public valueFio: any = '';
  data: DadataSuggestion[] = [];
  dataFio: DadataSuggestion[] = [];
  public address: DadataSuggestion = null;
  public fio: DadataSuggestion = null;
  currentFocus = -1;
  currentFocusFio = -1;
  @Output() selectedSuggestion: DadataSuggestion;
  @Output() selectedSuggestionFio: DadataSuggestion;
  // @ts-ignore
  @ViewChild('inputValue', {static: true}) inputValue: ElementRef;
  // @ts-ignore
  @ViewChild('inputValueFio', {static: true}) inputValueFio: ElementRef;
  public inputString$ = new Subject<string>();
  public inputStringFio$ = new Subject<string>();

  constructor(private dataService: DadataService) {
  }

  ngOnInit() {
    this.getAddress();
    this.getFio();
  }
  getData(value: string) {
    this.inputString$.next(value);
    this.currentFocus = -1;
  }
  getDataFio(value: string) {
    this.inputStringFio$.next(value);
    this.currentFocusFio = -1;
  }

  onClick(e: MouseEvent, item: DadataSuggestion) {
    this.inputValue.nativeElement.value = item.value;
    this.inputValue.nativeElement.focus();
    this.selectedSuggestion = item;
    this.data = [];
    this.currentFocus = -1;
    this.address = item;
  }

  onClickFio(e: MouseEvent, item: DadataSuggestion) {
    this.inputValueFio.nativeElement.value = item.value;
    this.inputValueFio.nativeElement.focus();
    this.selectedSuggestionFio = item;
    this.dataFio = [];
    this.currentFocusFio = -1;
    this.fio = item;
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
      });
    });
  }

  private getFio() {
    this.inputStringFio$.pipe(
      debounce(() => timer(500)),
    ).subscribe(x => {
      this.dataService.getData(x, DadataType.fio).subscribe((y: DadataResponse) => {
        this.dataFio = y.suggestions;
      });
    });
  }
}
