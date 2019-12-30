import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';

import {DadataService, DadataType} from '../../../services/dadata.service';
import {Subject, timer} from 'rxjs';
import {DadataAddressResponse} from '../../../model/dadata/dadata-response';
import {debounce} from 'rxjs/operators';
import {DadataAddressSuggestion} from '../../../model/dadata/suggestion';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public value: any = '';
  public data: DadataAddressSuggestion[] = [];
  public address: DadataAddressSuggestion = null;
  currentFocus = -1;
  @Output() selectedSuggestion: DadataAddressSuggestion;
  @Output() selectedSuggestionFio: DadataAddressSuggestion;
  // @ts-ignore
  @ViewChild('inputValue', {static: true}) inputValue: ElementRef;
  public inputString$ = new Subject<string>();

  constructor(private dataService: DadataService) {
  }

  ngOnInit() {
    this.getAddress();
  }

  getData(value: string) {
    this.inputString$.next(value);
    this.currentFocus = -1;
  }

  onClick(e: MouseEvent, item: DadataAddressSuggestion) {
    this.inputValue.nativeElement.value = item.value;
    this.inputValue.nativeElement.focus();
    this.selectedSuggestion = item;
    this.data = [];
    this.currentFocus = -1;
    this.address = item;
  }

  onEnter() {
    console.log('onEnterMethod start');
  }

  private getAddress() {
    this.inputString$.pipe(
      debounce(() => timer(500)),
    ).subscribe(x => {
      this.dataService.getData(x, DadataType.address).subscribe((y: DadataAddressResponse) => {
        this.data = y.suggestions;
      });
    });
  }
}
