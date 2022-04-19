import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {GenericService} from '../@core/shared/service/generic.service';
import {IntraBankModel} from '../@core/shared/model/intra-bank.model';

@Component({
    selector: 'app-intra-bank-confirm',
    templateUrl: './intra-bank-confirm.component.html',
    styleUrls: ['./intra-bank-confirm.component.scss']
})
export class IntraBankConfirmComponent implements OnInit {

    dataList: Array<IntraBankModel> = [];

    constructor(protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                protected genericService: GenericService) {

        console.log('[IntraBankConfirmComponent] intraBankList: ', this.gd.intraBankList);

        this.dataList = this.gd.intraBankList;
        for(let data of this.dataList) {
            data.type = 3;
        }

        console.log('[IntraBankConfirmComponent] intraBankList: ', this.gd.intraBankList);
        console.log('[IntraBankConfirmComponent] tradeList: ', this.gd.tradeList);
    }

    ngOnInit() {

    }

    saveToAll(dataList: any) {
        if(!this.gd.tradeList)
            this.gd.tradeList = [];

        console.log('[IntraBankConfirmComponent] saveToAll dataList: ', dataList);

        let tradeList = this.gd.tradeList;

        tradeList.push(...dataList);

        this.gd.tradeList = tradeList;

        console.log('[IntraBankConfirmComponent] tradeList: ', this.gd.tradeList);

    }

    goMain() {
        this.saveToAll(this.dataList);
        this.gd.clearIntraBankList();

        this.router.navigate(['/'+COMPONENT_AIO.MAIN]);
    }

    /**
     * Go to last page to confirm and save data
     */
    goNext() {
        this.saveToAll(this.dataList);
        this.gd.clearIntraBankList();

        this.router.navigate(['/'+ COMPONENT_AIO.FINISH]);
    }

    goBack() {
        this.router.navigate(['/'+ COMPONENT_AIO.INTRA_BANK_SETTING]);
    }
}
