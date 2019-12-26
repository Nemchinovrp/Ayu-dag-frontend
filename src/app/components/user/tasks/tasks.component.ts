import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
//
import {DadataService, DadataType} from '../../../services/dadata.service';
import {DadataSuggestion} from '../../../model/dadata/suggestion';
import {Subject, timer} from 'rxjs';
import {DadataConfig, DadataConfigDefault} from '../../../model/dadata/dadata-config';
import {DadataResponse} from '../../../model/dadata/dadata-response';
import {debounce} from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private v: any = '';
  data: DadataSuggestion[] = [];
  currentFocus = -1;
  @Input() disabled = null;
  @Input() placeholder = '';
  @Input() type = DadataType.address;
  @Input() config: DadataConfig = DadataConfigDefault;
  @Output() selectedSuggestion: DadataSuggestion;
  @Output() selected: EventEmitter<DadataSuggestion> = new EventEmitter<DadataSuggestion>();
  propagateChange: any = () => {
  };

  // @ts-ignore
  @ViewChild('inputValue', {static: true}) inputValue: ElementRef;

  public inputString$ = new Subject<string>();

  constructor(private dataService: DadataService, private r: Renderer2) {
  }

  get value(): any {
    return this.v;
  }

  set value(v: any) {
    if (v !== this.v) {
      this.v = v;
      this.propagateChange(v);
    }
  }

  getData(value: string) {
    console.log('getData Method - ', value);
    this.inputString$.next(value);
    this.currentFocus = -1;
  }

  onClick(e: MouseEvent, item: DadataSuggestion) {
    console.log('onClick Start', e);
    this.inputValue.nativeElement.value = item.value;
    this.propagateChange(item.value);
    this.inputValue.nativeElement.focus();
    this.selectedSuggestion = item;
    this.data = [];
    this.currentFocus = -1;
    console.log('onClick DadataSuggestion', item);
    this.selected.emit(item);
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
    this.propagateChange(this.selectedSuggestion.value);
    this.selected.emit(this.selectedSuggestion);
  }

  ngOnInit() {
    this.type = this.config.type;
    this.inputString$.pipe(
      debounce(() => timer(this.config.delay ? this.config.delay : 500)),
    ).subscribe(x => {
      this.dataService.getData(x).subscribe((y: DadataResponse) => {
        this.data = y.suggestions;
        console.log('ngOnInit - data', this.data);
        console.log('ngOnInit - DataResponse', y);
        console.log('ngOnInit - y.suggestions', y.suggestions);
      });
    });
  }
}
