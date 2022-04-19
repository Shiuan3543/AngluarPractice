import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {Observable} from 'rxjs';
import {GenericService} from '../@core/shared/service/generic.service';
import {ComponentType} from '@angular/cdk/overlay';
import {VerificationDialogComponent} from '../@core/shared/base/dialog/verification/verification-dialog.component';
import {DepositModel} from '../@core/shared/model/deposit.model';
import {BaseArrayComponent} from '../@core/shared/base/base-array.component';

@Component({
    selector: 'app-deposit-setting',
    templateUrl: './deposit-setting.component.html',
    styleUrls: ['./deposit-setting.component.scss']
})
export class DepositSettingComponent extends BaseArrayComponent<Array<DepositModel>> implements OnInit {

    //有摺
    hasPassbook: boolean = true;

    //本人帳戶
    isSelfAccount: boolean = false;

    baseModelList: Array<DepositModel> = [];

    constructor(protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                protected genericService: GenericService) {

        super(activatedRoute, routingService, dialogService, spinnerService, resizeService, router, fb, gd);

        console.log('this.gd.depositList: ', this.gd.depositList);
        if(this.gd.depositList && this.gd.depositList.length > 0) {
            this.baseModelList = this.gd.depositList;
            this.addAll(this.baseModelList);
        }else{
            this.add();
        }
        console.log('DepositModel: ', this.baseModelList);
    }

    ngOnInit() {
        super.ngOnInit();
    }


    initData(): Observable<Object> {
        return new Observable((observer) => {
            observer.next(true); //true才會append FormGroup Validator
        });
    }

    resetFormControl(): void {
    }

    clearAndUpdateRelated(value: boolean) {
        this.hasPassbook = value;
        this.clear();
        console.log('clear origin data...');
        console.log('hasPassbook: ', this.hasPassbook);
    }

    updateSelfAccountInfo(value: boolean) {
        this.isSelfAccount = value;

        console.log('isSelfAccount: ', this.isSelfAccount);

        //Way 1:
        // this.baseModelList = this.myFormGroup.getRawValue().baseModelFormArray;
        // this.baseModelList.forEach( (data: DepositModel)=> {
        //     data.isSelfAccount = this.isSelfAccount;
        // });
        // this.baseModelFormArray.patchValue(this.baseModelList);

        //Way 2:
        this.myFormGroup.getRawValue().baseModelFormArray.forEach( (data: DepositModel, index: number)=> {
            data.isSelfAccount = this.isSelfAccount;
            this.baseModelFormArray.at(index).patchValue(data);
        });


        console.log('updateInfo: ', this.myFormGroup.getRawValue());
    }

    validateBeforeRoute(routingModel: any): boolean {
        console.log('[validateBeforeRoute] myFormGroup.value: ', this.myFormGroup.value);
        return true;
    }

    goNext() {
        console.log('this.myFormGroup 2: ', this.myFormGroup.getRawValue().baseModelFormArray);
        if(this.myFormGroup.valid && this.myFormGroup.getRawValue().baseModelFormArray.length > 0){ //有資料才儲存
            this.gd.depositList = this.myFormGroup.getRawValue().baseModelFormArray;
        }
        if(this.hasPassbook) {
            //有摺 -> 臨櫃交易人資訊
            this.router.navigate(['/' + COMPONENT_AIO.CASH_DEPOSIT_CONFIRM]);
        }else{
            //無摺 -> 臨櫃交易人資訊
            this.router.navigate(['/'+ COMPONENT_AIO.CASH_DEPOSIT_COUNTER_TRADER]);
        }
    }

    clear(){
        this.myFormGroup.reset();
        this.baseModelFormArray.clear();
        this.baseModelList = [];
        this.add();
    }

    add(data ?: DepositModel){
        console.log('add: ', this.myFormGroup.getRawValue())

        let depositModel = new DepositModel(); //預設有一筆
        depositModel.money = undefined;
        depositModel.memo = '';
        depositModel.depositAccount = '';
        depositModel.isCash = true;

        depositModel.hasPassbook = this.hasPassbook; //有摺/無摺
        depositModel.isSelfAccount = this.isSelfAccount; //是否本人帳戶

        console.log('depositModel.getValidators(): ', depositModel.getValidators());

        const modelForm = this.fb.group(depositModel.getValidators());
        this.baseModelFormArray.push(modelForm);

        console.log('modelForm: ', modelForm);
        console.log('baseModelFormArray: ', this.baseModelFormArray);

        this.baseModelList.push(depositModel);
    }

    /**
     * Batch copy
     * @param baseModelList
     */
    addAll(baseModelList: Array<DepositModel>) {
        let depositModel = new DepositModel(); //預設有一筆

        baseModelList.forEach( (model: DepositModel)=> {
            Object.assign(depositModel, model); //clone 但不刪除 method

            console.log('depositModel.getValidators(): ', depositModel.getValidators());

            //create related form control
            const modelForm = this.fb.group(depositModel.getValidators());
            this.baseModelFormArray.push(modelForm);

            console.log('modelForm: ', modelForm);
        });


        console.log('baseModelFormArray: ', this.baseModelFormArray);

        this.baseModelList.push(depositModel);
    }

    public showVerificationDialog<T>(data: any, component?: ComponentType<T>) {
        let contentComponent: any = VerificationDialogComponent;
        if (component) {
            contentComponent = component;
        }

        const dialog = this.myDialogService.open(contentComponent, {
            width: '573px',
            height: '200px',
            leftTitle: false,
            centerTitle: true,
            title: '以下欄位尚未通過驗證：',
            data: data,
            style: this.dialogType
        });

        //從 dialog 取回資料
        dialog.afterClosed().subscribe((result) => {
            console.log('Result data: ', result);
        });
    }

    test(){
        console.log('hasPassbook: ', this.hasPassbook);
        console.log('isSelfAccount: ', this.isSelfAccount);
        console.log(this.myFormGroup.getRawValue())
    }
}
