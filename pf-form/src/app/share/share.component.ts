import { Component, OnInit } from '@angular/core';
import {Share} from '../@core/shared/model/share.model';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

    share: Share;
    rootUrl = 'http://172.16.1.69:4000/#/identity/';
    qrUrl: string;
    myCount: number;

  constructor(protected router: Router, protected routingService: RouteUiService,
              protected http: HttpClient,
              protected gd: GlobalDataService) { }

  ngOnInit(): void {
      this.share = new Share();
      this.share.idno = this.gd.idno;
      console.log('gd.idno:', this.gd.idno);
  }

    createQrCode() {
        this.http.post('/shareq/create', this.share).subscribe((res: any) => {
            this.share = res;
            this.qrUrl = this.rootUrl + this.share.shortUrl;
            console.log('qrUrl', this.qrUrl);
        });
    }

    saveAsImg(parent) {
        console.log('parent:', parent);
        const parentElement = parent.qrcElement.nativeElement.querySelector('img').src;
        const blobData = this.base64ToImg(parentElement);
        console.log('blob', blobData);

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
        } else {
            const url = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Qrcode';
            link.click();
        }
    }

    private base64ToImg(base64Img: any) {
        const parts = base64Img.split(';base64,');
        const imgType = parts[0].split(':')[1];
        const decodeData = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(decodeData.length);
        for (let i = 0; i < decodeData.length; i++) {
            uInt8Array[i] = decodeData.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: imgType});
    }

    shareCount() {
        this.share.idno = this.gd.idno;
        this.http.post('/shareq/getCount', this.share).subscribe((res: any) => {
            this.share = res;
            this.myCount = this.share.shareCount;
        });
    }

    goMain() {
        this.router.navigate(['/' + COMPONENT_AIO.MAIN]);
    }
}
