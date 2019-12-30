import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';

import {DadataService} from '../../../services/dadata.service';
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
  currentFocus = -1;
  @Output() selectedSuggestion: DadataSuggestion;
  // @ts-ignore
  @ViewChild('inputValue', {static: true}) inputValue: ElementRef;
  public inputString$ = new Subject<string>();

  constructor(private dataService: DadataService) {
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
    console.log('onClick DadataSuggestion', item);
  }

  onEnter() {
    console.log('onEnterMethod start');
    this.selectedSuggestion = this.data[this.currentFocus];
    console.log('onEnterMethod this.selectedSuggestion', this.selectedSuggestion);
    console.log('onEnterMethod this.data[this.currentFocus]', this.data[this.currentFocus]);
    this.inputValue.nativeElement.value = this.selectedSuggestion.value;
    console.log('onEnterMethod this.inputValue.nativeElement.value', this.inputValue.nativeElement.value);
    this.data = [];
    this.currentFocus = -1;
  }

  ngOnInit() {
    this.inputString$.pipe(
      debounce(() => timer(500)),
    ).subscribe(x => {
      this.dataService.getData(x).subscribe((y: DadataResponse) => {
        this.data = y.suggestions;
        console.log('ngOnInit - inputString ', this.inputString$);
      });
    });
  }
}
