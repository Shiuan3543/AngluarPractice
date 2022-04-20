import { QRCodeModule } from 'angularx-qrcode';
import { Component, OnInit } from '@angular/core';
// import { TradeModel } from "../@core/shared/model/trade.model";
import { HttpClient } from '@angular/common/http';
// import { SpinnerService } from "../@core/shared/service/spinner.service";
// import { FormBuilder } from "@angular/forms";
// import { RouteUiService } from "../@core/shared/service/route-ui.service";
import { ActivatedRoute, Router } from '@angular/router';
// import { SlideDialogService } from "../@core/shared/service/slide-dialog.service";
// import { ResizeService } from "../@core/shared/service/resize.service";
// import { GlobalDataService } from "../@core/shared/service/global.service";
// import { ApplyStartVO } from "../@core/shared/model/apply-start.model";
import { shorts } from '../@core/shared/model/shorts.model';
import { COMPONENT_AIO } from '../@core/shared/routing/aio.path';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.scss'],
})
export class ShorturlComponent implements OnInit {
  //   short: shorts = new shorts();

  shortList: Array<shorts> = [];
  longUrl = '';
  shortUrl = '';
  // displayId = 0;

  shortcut: shorts = new shorts();
  constructor(
    private http: HttpClient,
    // protected routingService: RouteUiService,
    // protected dialogService: SlideDialogService,
    // protected spinnerService: SpinnerService,
    // protected resizeService: ResizeService,
    // protected fb: FormBuilder,
    protected router: Router // protected activatedRoute: ActivatedRoute, // protected gd: GlobalDataService
  ) {}
  ngOnInit(): void {
    // console.log('短list:', this.shortList);
    this.getShort();
  }
  getShort() {
    this.http.get('shortcut/getAll').subscribe((res: any) => {
      this.shortList = res;
      console.log('res', res);
    });
  }
  addUrl(url: string) {
    console.log('長', url);
    this.http
      .post('shortcut/add', this.shortcut.longUrl)
      .subscribe((res: any) => {
        console.log('res:', res);
        this.shortcut = res;
        this.shortUrl = this.shortcut.shortUrl;
        this.getShort();
        console.log('shortUrl:', this.shortUrl);
      });
  }

  searchLongUrl(url: string){
    console.log('短', url);
    this.shortcut.shortUrl = url;
    this.http.post('shortcut/link', this.shortcut.shortUrl).subscribe((res: any) => {
      console.log('res:', res);
      this.shortcut = res;
      console.log('shortcut.longUrl:', this.shortcut.longUrl);
      this.goToLink(this.shortcut.longUrl);
    });
  }

  deleteUrl(id: number) {
    this.http.delete('/short/' + id).subscribe((res: any) => {
      this.getShort();
    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  saveAsImage(parent) {
    // fetches base 64 date from image
    const parentElement = parent.el.nativeElement.querySelector('img').src;

    // converts base 64 encoded image to blobData
    const blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // IE
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else {
      // chrome
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }
  }
  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

  goMain() {
    this.router.navigate([COMPONENT_AIO.MAIN]);
  }

  // 輸入長網址
  //   gogogo() {
  //     this.http.post("addShort", this.short.longUrl).subscribe((res: any) => {
  //       this.getShort();
  //     });
  //   }

  // 檢視資料
  //   getShort() {
  //     this.http.get("allShort").subscribe((res: any) => {
  //       this.shortList = res;
  //     });
  //   }

  //   getout() {
  //     this.http.post("shortLink", this.short.shortUrl).subscribe((res: any) => {
  //       this.short = res;
  //       window.open(this.short.longUrl);
  //     });
  //   }
  //   ngOnInit(): void {
  //     this.getShort();
  //   }
}
