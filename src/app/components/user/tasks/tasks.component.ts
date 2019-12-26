import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
//
import {DadataService, DadataType} from '../../../services/dadata.service';
import {DadataSuggestion} from '../../../model/dadata/suggestion';
import {ControlValueAccessor} from '@angular/forms';
import {Subject, timer} from 'rxjs';
import {DadataConfig, DadataConfigDefault} from '../../../model/dadata/dadata-config';
import {DadataResponse} from '../../../model/dadata/dadata-response';
import {debounce} from 'rxjs/operators';
import {DadataAddress} from '../../../model/dadata/data';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, ControlValueAccessor, OnChanges {
  private v: any = '';
  data: DadataSuggestion[] = [];
  currentFocus = -1;
  @Input() disabled = null;
  @Input() placeholder = '';
  @Input() type = DadataType.address;
  @Input() config: DadataConfig = DadataConfigDefault;
  @Output() selectedSuggestion: DadataSuggestion;
  @Output() selected: EventEmitter<DadataSuggestion> = new EventEmitter<DadataSuggestion>();
  propagateChange: any = () => {};

  // @ts-ignore
  @ViewChild('inputValue', { static: true }) inputValue: ElementRef;
  onTouched = () => {};

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
    console.log(value);
    this.inputString$.next(value);
    this.currentFocus = -1;
  }

  onClick(e: MouseEvent, item: DadataSuggestion) {
    // e.preventDefault();
    this.inputValue.nativeElement.value = item.value;
    this.propagateChange(item.value);
    this.inputValue.nativeElement.focus();
    this.selectedSuggestion = item;
    this.data = [];
    this.currentFocus = -1;

    // this.writeValue(item.value);
    this.selected.emit(item);
    // this.selectedData.emit(item.data);
    // this.selectedString.emit(item.value);
  }

  onEnter() {
    console.log('onEnter', this.selectedSuggestion, this.data[this.currentFocus]);
    this.selectedSuggestion = this.data[this.currentFocus];
    this.inputValue.nativeElement.value = this.selectedSuggestion.value;
    this.data = [];
    this.currentFocus = -1;
    this.propagateChange(this.selectedSuggestion.value);
    // this.writeValue(this.selectedSuggestion.value);
    this.selected.emit(this.selectedSuggestion);
    // this.selectedData.emit(this.selectedSuggestion.data);
    // this.selectedString.emit(this.selectedSuggestion.value);
  }

  onArrowDown() {
    this.removeFocus(this.currentFocus);
    if (this.currentFocus >= this.data.length - 1) {
      this.currentFocus = 0;
    } else {
      this.currentFocus++;
    }
    this.setFocus(this.currentFocus);
  }

  onArrowUp() {
    this.removeFocus(this.currentFocus);
    if (this.currentFocus === 0) {
      this.currentFocus = this.data.length - 1;
    } else {
      this.currentFocus--;
    }
    this.setFocus(this.currentFocus);
  }

  setFocus(id: number) {
    const activeEl = document.getElementById(id + 'item');
    this.r.addClass(activeEl, 'active');
  }

  removeFocus(id: number) {
    if (id !== -1) {
      const activeEl = document.getElementById(id + 'item');
      this.r.removeClass(activeEl, 'active');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.type = this.config.type;
/*    this.locations = this.config.locations;
    this.dataService.setApiKey(this.apiKey ? this.apiKey : this.config.apiKey);*/
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

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.v = value;
    }
  }

  @HostListener('document:click')
  onOutsideClick() {
    this.data = [];
  }
}
