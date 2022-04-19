import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {TradeModel} from '../@core/shared/model/trade.model';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-finish',
    templateUrl: './finish.component.html',
    styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

    tradeList: Array<TradeModel> = [];

    constructor(private http:HttpClient,
                protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService) {

        this.tradeList = this.gd.tradeList;
        console.log('tradeList: ', this.tradeList);

        console.log('depositList: ', this.gd.depositList);
        console.log('withdrawList: ', this.gd.withdrawList);
    }

    ngOnInit() {

    }

    sendEmail() {
        console.log(this.gd.idno);
        // this.router.navigate(['/' + COMPONENT_AIO.CASH_DEPOSIT_SETTING]);
    }

    finish() {
        const t = this.tradeList;
        for(let i in t) { //塞給每一個交易
            t[i].idno = this.gd.idno;
            t[i].phone = this.gd.phone;
        }
        this.http.post("atm/add",this.tradeList).subscribe((res:any) =>{
        });
        this.gd.clearData(); //clear all session storage data
        this.router.navigate(['/']);
    }
}
