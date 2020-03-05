import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FileUploader} from 'ng2-file-upload';
import {DadataAddressSuggestion} from '../../../model/dadata/suggestion';
import {Subject, timer} from 'rxjs';
import {DadataService, DadataType} from '../../../services/dadata.service';
import {HotelService} from '../../../services/hotel.service';
import {debounce} from 'rxjs/operators';
import {DadataAddressResponse} from '../../../model/dadata/dadata-response';

@Component({
  selector: 'app-hotel-addition',
  templateUrl: './hotel-addition.component.html',
  styleUrls: ['./hotel-addition.component.css']
})
export class HotelAdditionComponent implements OnInit {

  baseUrl = environment.baseUrl;
  loadImages: Array<string> = [];
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  nameHotel: string;
  descriptionHotel: string;
  response: string;
  public value: any = '';
  public data: DadataAddressSuggestion[] = [];
  public address: DadataAddressSuggestion = null;
  currentFocus = -1;
  @Output() selectedSuggestion: DadataAddressSuggestion;
  // @ts-ignore
  @ViewChild('inputValue', {static: true}) inputValue: ElementRef;
  public inputString$ = new Subject<string>();

  constructor(private dataService: DadataService, private hotelService: HotelService) {
    this.uploader = new FileUploader({
      url: this.baseUrl.concat('/upload'),
      maxFileSize: 1048576,
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => {
      this.response = res;
      this.loadImages.push(this.response);
    });
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

  save() {
    this.hotelService.saveHotel(this.nameHotel, this.descriptionHotel, this.address.data).subscribe(
      response => {
        console.log('response - ' + response);
      },
      err => {
        console.log(err);
      }
    );
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
