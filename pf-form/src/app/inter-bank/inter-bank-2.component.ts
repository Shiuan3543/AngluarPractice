import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../@core/shared/base/base.component';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {Observable} from "rxjs/internal/Observable"
import {GenericService} from '../@core/shared/service/generic.service';
import {ComponentType} from '@angular/cdk/overlay';
import {VerificationDialogComponent} from '../@core/shared/base/dialog/verification/verification-dialog.component';
import {CustomDialogService} from 'src/app/@core/shared/service/custom-dialog.service';
import {InterBankModel} from '../@core/shared/model/inter-bank.model';
import {TRANSACTION_TYPE} from '../@core/shared/app.constants';



@Component({
    selector: 'app-inter-bank-2',
    templateUrl: './inter-bank-2.component.html',
    styleUrls: ['./inter-bank-2.component.scss']
})
export class InterBank2Component extends BaseComponent<InterBankModel> implements OnInit {

    baseModel: InterBankModel = new InterBankModel();

    TRANSACTION_TYPE = TRANSACTION_TYPE;

    transactionType: number = TRANSACTION_TYPE.ACCOUNT;

    // 有無代理人
    isAgent = false;

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

        super(activatedRoute, routingService, dialogService, spinnerService, resizeService, router, fb, gd);


        if(this.gd.interBankList) {
            // Object.assign(this.baseModel, this.gd.interBankList); //右邊clone到左邊, 但不刪除 model validators method
            this.add(this.gd.interBankList);
        }else{
            this.add();
        }

        // this.baseModel.transactionType = TRANSACTION_TYPE.ACCOUNT;


        //init form group (baseModel should not be null)
        this.appendFormValidator(true);


    }

    ngOnInit() {
        super.ngOnInit();
        //this.baseModel.transactionType =TRANSACTION_TYPE.ACCOUNT;
        this.isByAccount();
    }

    initData(): Observable<Object> {
        return new Observable((observer) => {
            observer.next(true); //true才會append FormGroup Validator
        });
    }

    resetFormControl(): void {
        //this.disableFormControl(this.getFieldName(this.baseModel).money);
        this.disableFormControl(this.getFieldName(this.baseModel).memo);

        //收款帳號
        this.disableFormControl(this.getFieldName(this.baseModel).payeeAccount);

        //收款戶名
        this.disableFormControl(this.getFieldName(this.baseModel).payeeName);

        //匯款人資訊
        // this.disableFormControl(this.getFieldName(this.baseModel).remitterName);
        // this.disableFormControl(this.getFieldName(this.baseModel).remitterIdno);
        // this.disableFormControl(this.getFieldName(this.baseModel).remitterPhone);
        //this.disableFormControl(this.getFieldName(this.baseModel).remitterAccount);
        //代理人資訊
        this.disableFormControl(this.getFieldName(this.baseModel).agentName);
        this.disableFormControl(this.getFieldName(this.baseModel).agentIdno);
        this.disableFormControl(this.getFieldName(this.baseModel).agentPhone);
    }

    clearAndUpdateRelated(value: any) {
        this.transactionType = value;
        // this.clear();
        console.log('clear origin data...');
        console.log('transactionType: ', this.transactionType);

        //更新匯款方式
        this.updateFormControlValue(this.getFieldName(this.baseModel).transactionType, this.transactionType);

        if(this.transactionType === TRANSACTION_TYPE.ACCOUNT){
            this.enableFormControl(this.getFieldName(this.baseModel).remitterAccount);
        }else{
            //選擇現金扣款不需填扣款帳號
            this.disableFormControl(this.getFieldName(this.baseModel).remitterAccount);
        }
    }

    validateBeforeRoute(baseModel: any, disableFormGroup: boolean | undefined): boolean {
        return true;
    }

    goBack(){
        this.router.navigate([COMPONENT_AIO.INTER_BANK_SETTING]);
    }

    updateAgentInfo(event: any){
        const value = event.target.checked;

        if(value) {
            this.isAgent = true;
            this.enableFormControl(this.getFieldName(this.baseModel).agentName);
            this.enableFormControl(this.getFieldName(this.baseModel).agentIdno);
            this.enableFormControl(this.getFieldName(this.baseModel).agentPhone);
        }else{
            this.isAgent = false;
            this.disableFormControl(this.getFieldName(this.baseModel).agentName);
            this.disableFormControl(this.getFieldName(this.baseModel).agentIdno);
            this.disableFormControl(this.getFieldName(this.baseModel).agentPhone);
        }
        console.log('updateAgentInfo: ', value);
        console.log('Agent: ',this.myFormGroup);
        this.myFormGroup.updateValueAndValidity();
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

    //存摺扣款
    isByAccount() : boolean {
        return (this.getFormControlValue(this.getFieldName(this.baseModel).transactionType) === TRANSACTION_TYPE.ACCOUNT);
    }

    goNext(): void {
        console.log('第二頁FG: ', this.myFormGroup.getRawValue());
        //console.log('第二頁FG: ', this.myFormGroup.getRawValue().money);
        if (this.myFormGroup.invalid) {
            this.showVerificationDialog(this.findInvalidControls());
            return;
        }
        this.gd.interBankList = this.myFormGroup.getRawValue();

        console.log('第二頁list', this.gd.interBankList);
        this.router.navigate([COMPONENT_AIO.INTER_BANK_CONFIRM]);
    }

    clear(){
        this.myFormGroup.reset();
        this.baseModel = new InterBankModel();
        this.add();
    }

    add(data ?: InterBankModel){
        console.log('before add: ', this.myFormGroup.getRawValue())

        // this.baseModel = new InterBankModel(); //預設有一筆
        // this.baseModel.payeeAccount = '';
        // this.baseModel.remitterAccount = '';
        // this.baseModel.money = undefined;
        // this.baseModel.memo = '';
        // this.baseModel.transactionType = TRANSACTION_TYPE.ACCOUNT;
        let interBankModel = new InterBankModel(); //預設有一筆
        interBankModel.payeeAccount = '';
        interBankModel.remitterAccount = '';
        interBankModel.money = undefined;
        interBankModel.memo = 'gg';
        interBankModel.isAgent = false;
        // interBankModel.transactionType = TRANSACTION_TYPE.ACCOUNT;
        if(data){
            Object.assign(interBankModel, data);  //右邊clone到左邊, 但不刪除 model validators method
        }

        this.baseModel =  interBankModel;




        console.log('add: ', this.baseModel);
        this.myFormGroup.patchValue(this.baseModel);
    }

    // test(){
    //     if (this.myFormGroup.invalid) {
    //         this.showVerificationDialog(this.findInvalidControls());
    //     }
    //     console.log(this.myFormGroup.getRawValue())
    //
    //
    // }
}
