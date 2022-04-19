import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {Observable} from 'rxjs';
import {GenericService} from '../@core/shared/service/generic.service';
import {ComponentType} from '@angular/cdk/overlay';
import {VerificationDialogComponent} from '../@core/shared/base/dialog/verification/verification-dialog.component';
import {WithdrawModel} from '../@core/shared/model/withdraw.model';
import {BaseArrayComponent} from '../@core/shared/base/base-array.component';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';

@Component({
    selector: 'app-withdraw-setting',
    templateUrl: './withdraw-setting.component.html',
    styleUrls: ['./withdraw-setting.component.scss']
})
export class WithdrawSettingComponent extends BaseArrayComponent<Array<WithdrawModel>> implements OnInit {

    //有摺
    hasPassbook: boolean = true;

    //本人帳戶
    isSelfAccount: boolean = true;

    baseModelList: Array<WithdrawModel> = [];

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

        console.log('this.gd.depositList: ', this.gd.withdrawList);
        if(this.gd.withdrawList && this.gd.withdrawList.length > 0) {
            this.baseModelList = this.gd.withdrawList;
            this.addAll(this.baseModelList);
        }else{
            this.add();
        }
        console.log('WithdrawModel: ', this.baseModelList);
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

    validateBeforeRoute(baseModel: any, disableFormGroup: boolean | undefined): boolean {
        return true;
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

    goNext() {
        //this.myFormGroup.controls['baseModelFormArray']
        console.log('this.myFormGroup 2: ', this.myFormGroup.getRawValue().baseModelFormArray);
        if(this.myFormGroup.valid && this.myFormGroup.getRawValue().baseModelFormArray.length > 0){ //有資料才儲存
            this.gd.depositList = this.myFormGroup.getRawValue().baseModelFormArray;
        }
        this.router.navigate(['/' + COMPONENT_AIO.CASH_WITHDRAW_CONFIRM]);
    }

    clear(){
        this.myFormGroup.reset();
        this.baseModelFormArray.clear();
        this.baseModelList = [];
        this.add();
    }

    add(data ?: WithdrawModel){
        console.log('add: ', this.myFormGroup.getRawValue())

        let withdrawModel = new WithdrawModel(); //預設有一筆
        withdrawModel.money = undefined;
        withdrawModel.memo = '';
        withdrawModel.withdrawAccount = '';
        withdrawModel.isCash = true;

        withdrawModel.hasPassbook = this.hasPassbook; //有摺/無摺
        withdrawModel.isSelfAccount = this.isSelfAccount; //提款一定為本人帳戶

        console.log('withdrawModel.getValidators(): ', withdrawModel.getValidators());

        const modelForm = this.fb.group(withdrawModel.getValidators());
        this.baseModelFormArray.push(modelForm);

        this.baseModelList.push(withdrawModel);
    }

    /**
     * Batch copy
     * @param baseModelList
     */
    addAll(baseModelList: Array<WithdrawModel>) {
        let withdrawModel = new WithdrawModel(); //預設有一筆

        baseModelList.forEach( (model: WithdrawModel)=> {
            Object.assign(withdrawModel, model); //clone 但不刪除 method

            console.log('withdrawModel.getValidators(): ', withdrawModel.getValidators());

            //create related form control
            const modelForm = this.fb.group(withdrawModel.getValidators());
            this.baseModelFormArray.push(modelForm);

            console.log('modelForm: ', modelForm);
        });


        console.log('baseModelFormArray: ', this.baseModelFormArray);

        this.baseModelList.push(withdrawModel);
    }



    test(){
        console.log('hasPassbook: ', this.hasPassbook);
        console.log('isSelfAccount: ', this.isSelfAccount);
        console.log(this.myFormGroup.getRawValue())
    }
}
