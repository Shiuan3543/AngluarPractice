import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {HttpClient} from "@angular/common/http";
import {TradeModel} from "../@core/shared/model/trade.model";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(private http:HttpClient,
                protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService) {
    }
    tradeList: Array<TradeModel> = [];
    ngOnInit() {

    }

    goCashDeposit() {
        this.router.navigate(['/'+ COMPONENT_AIO.CASH_DEPOSIT_SETTING]);
    }

    goCashWithdrawal() {
        this.router.navigate(['/'+COMPONENT_AIO.CASH_WITHDRAW_SETTING]);
    }

    goIntraBank() {
        this.router.navigate(['/'+COMPONENT_AIO.INTRA_BANK_SETTING]);
    }

    goInterBank() {
        this.router.navigate(['/'+COMPONENT_AIO.INTER_BANK_SETTING]);
    }

    getUser(){
        this.router.navigate(['/'+COMPONENT_AIO.USER]);
    }
    getShortUrl(){
        this.router.navigate(['/'+COMPONENT_AIO.SHORTURL]);
    }

}
