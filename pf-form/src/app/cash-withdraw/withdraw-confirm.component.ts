import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WithdrawModel} from '../@core/shared/model/withdraw.model';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {GenericService} from '../@core/shared/service/generic.service';

@Component({
    selector: 'app-withdraw-confirm',
    templateUrl: './withdraw-confirm.component.html',
    styleUrls: ['./withdraw-confirm.component.scss']
})
export class WithdrawConfirmComponent implements OnInit {

    dataList: Array<WithdrawModel> = [];

    constructor(protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                protected genericService: GenericService) {

        console.log('[DepositConfirmComponent] depositList: ', this.gd.depositList);

        this.dataList = this.gd.depositList;
        for(let data of this.dataList) {
            data.type = 2;
        }

        console.log('[DepositConfirmComponent] tradeList: ', this.gd.tradeList);


    }

    ngOnInit() {

    }

    saveToAll(dataList: any) {
        if(!this.gd.tradeList)
            this.gd.tradeList = [];

        console.log('[DepositConfirmComponent] saveToAll dataList: ', dataList);

        let tradeList = this.gd.tradeList;

        tradeList.push(...dataList);

        this.gd.tradeList = tradeList;

        console.log('[DepositConfirmComponent] tradeList: ', this.gd.tradeList);

    }

    goMain() {
        this.saveToAll(this.dataList);
        this.gd.clearDepositList();

        this.router.navigate(['/'+COMPONENT_AIO.MAIN]);
    }

    /**
     * Go to last page to confirm and save data
     */
    goNext() {
        this.saveToAll(this.dataList);
        this.gd.clearDepositList();


        this.router.navigate(['/'+ COMPONENT_AIO.FINISH]);
    }

    goBack() {
        this.router.navigate(['/'+ COMPONENT_AIO.CASH_DEPOSIT_SETTING]);
    }

}
