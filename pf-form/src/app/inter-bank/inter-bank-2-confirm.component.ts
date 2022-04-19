import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {GenericService} from '../@core/shared/service/generic.service';
import {InterBankModel} from '../@core/shared/model/inter-bank.model';
import {ApplyStartVO} from "../@core/shared/model/apply-start.model";
import {GenericDialogComponent} from "../@core/shared/base/dialog/info/generic-dialog.component";

@Component({
    selector: 'app-inter-bank-2-confirm',
    templateUrl: './inter-bank-2-confirm.component.html',
    styleUrls: ['./inter-bank-2-confirm.component.scss']
})
export class InterBank2ConfirmComponent implements OnInit {

    data: InterBankModel;

    constructor(protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                protected genericService: GenericService) {



        this.data = this.gd.interBankList;
        this.data.type = 4;


        console.log('確認list: ', this.gd.interBankList);
        console.log('確認data:', this.data);


    }

    ngOnInit() {

    }
    public showWarningDialog(data?: any) {
        let contentComponent: any = GenericDialogComponent;

        const dialog = this.dialogService.open(contentComponent, {
            width: '400px',
            height: '200px',
            title: '',
            data: data,
            style: DIALOG_TYPE.DIALOG
        });

        //從 dialog 取回資料
        dialog.afterClosed().subscribe((result) => {
            console.log('Result data: ', result);
            this.spinnerService.hide();
        });
    }

    saveToAll(data: any) {
        if(!this.gd.tradeList)
            this.gd.tradeList = [];

        console.log('[InterBank2ConfirmComponent] saveToAll data: ', data);

        let tradeList = this.gd.tradeList;

        tradeList.push(...data);

        this.gd.tradeList = tradeList;

        console.log('[InterBank2ConfirmComponent] tradeList: ', this.gd.tradeList);


    }

    goMain() {
        this.saveToAll(this.data);
        this.gd.clearInterBankList();

        this.router.navigate(['/'+COMPONENT_AIO.MAIN]);
    }

    /**
     * Go to last page to confirm and save data
     */
    goNext() {
        this.saveToAll(this.data);

        //save data to server

        const tradeList = this.gd.tradeList;
        // const userVO: ApplyStartVO = this.gd.userInfo;


        this.router.navigate(['/'+ COMPONENT_AIO.FINISH]);
    }

    goBack() {
        this.router.navigate(['/'+ COMPONENT_AIO.INTER_BANK_2]);
    }

}
