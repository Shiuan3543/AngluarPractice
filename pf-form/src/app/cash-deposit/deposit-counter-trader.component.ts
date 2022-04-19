import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ModalService} from '../@core/shared/component/modal.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {GenericService} from '../@core/shared/service/generic.service';
import {CustomDialogService} from 'src/app/@core/shared/service/custom-dialog.service';
import {TraderModel} from '../@core/shared/model/trader.model';

@Component({
    selector: 'app-deposit-counter-trader',
    templateUrl: './deposit-counter-trader.component.html',
    styleUrls: ['./deposit-counter-trader.component.scss']
})
export class DepositCounterTraderComponent implements OnInit {

    traderModel: TraderModel = new TraderModel();

    constructor(protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                protected genericService: GenericService,
                private customDialogService: CustomDialogService) {

        this.gd.clearTrader();
    }

    ngOnInit() {

    }

    goNext() {
        console.log('Parameter: ', this.traderModel);
        // this.router.navigate(['/'+ COMPONENT_AIO.CASH_DEPOSIT_CONFIRM]);
        this.router.navigate(['/'+ COMPONENT_AIO.CASH_DEPOSIT_CONFIRM],
            { queryParams: { trader: JSON.stringify(this.traderModel) }});

        //or save to sessionStorage
        this.gd.depositTrader = this.traderModel;
    }

    goMain(){
        this.router.navigate(['/'+ COMPONENT_AIO.MAIN]);
    }



}
