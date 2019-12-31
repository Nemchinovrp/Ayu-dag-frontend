import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';

import {DadataService, DadataType} from '../../../services/dadata.service';
import {Subject, timer} from 'rxjs';
import {DadataAddressResponse} from '../../../model/dadata/dadata-response';
import {debounce} from 'rxjs/operators';
import {DadataAddressSuggestion} from '../../../model/dadata/suggestion';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
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
    this.uploader = new FileUploader({
      url: URL,
      maxFileSize: 1048576,
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
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

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
