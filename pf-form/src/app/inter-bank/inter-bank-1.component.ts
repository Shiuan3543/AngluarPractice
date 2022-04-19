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
import {Observable} from 'rxjs';
import {GenericService} from '../@core/shared/service/generic.service';
import {ComponentType} from '@angular/cdk/overlay';
import {VerificationDialogComponent} from '../@core/shared/base/dialog/verification/verification-dialog.component';
import {InterBankModel} from '../@core/shared/model/inter-bank.model';
import { TRANSACTION_TYPE } from '../@core/shared/app.constants';

@Component({
    selector: 'app-inter-bank-1',
    templateUrl: './inter-bank-1.component.html',
    styleUrls: ['./inter-bank-1.component.scss']
})
export class InterBank1Component extends BaseComponent<InterBankModel> implements OnInit {

    baseModel: InterBankModel = new InterBankModel();


    // 銀行清單
    bankList = ["中央信託","台灣銀行"];

    // 分行清單
    branchBankList = ["台北分行","台中分行"];

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


        console.log('this.gd.interBankList: ', this.gd.interBankList);
        if(this.gd.interBankList) {
            
            this.add(this.gd.interBankList);
        }else{
            this.add();
        }

        //init form group (baseModel should not be null)
        this.appendFormValidator(true);

        console.log('IntraBankModel: ', this.baseModel);
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
        this.disableFormControl(this.getFieldName(this.baseModel).money);
        this.disableFormControl(this.getFieldName(this.baseModel).memo);

        this.disableFormControl(this.getFieldName(this.baseModel).transactionType);

        //此步驟 扣款帳號不需檢查
        this.disableFormControl(this.getFieldName(this.baseModel).remitterAccount);

        this.disableFormControl(this.getFieldName(this.baseModel).remitterName);
        this.disableFormControl(this.getFieldName(this.baseModel).remitterIdno);
        this.disableFormControl(this.getFieldName(this.baseModel).remitterPhone);

        this.disableFormControl(this.getFieldName(this.baseModel).agentName);
        this.disableFormControl(this.getFieldName(this.baseModel).agentIdno);
        this.disableFormControl(this.getFieldName(this.baseModel).agentPhone);
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

    getBankList(): void {


    }


    // 取得分行資料
    getBranchBankList() {


    }

    clear(){
        this.myFormGroup.reset();
        this.baseModel = new InterBankModel();
        this.add();
    }

    add(data ?: InterBankModel){
        console.log('add: ', this.myFormGroup.getRawValue())

        let interBankModel = new InterBankModel(); //預設有一筆
        interBankModel.money = undefined;
        interBankModel.memo = '';
        interBankModel.transactionType = TRANSACTION_TYPE.ACCOUNT;

        if(data){
            Object.assign(interBankModel, data); //右邊clone到左邊, 但不刪除 model validators method
        }

        this.baseModel =  interBankModel;

        this.myFormGroup.patchValue(this.baseModel);
    }

    // goNext(){
    //     if (this.myFormGroup.invalid) {
    //         this.showVerificationDialog(this.findInvalidControls());
    //         return;
    //     }
    //     this.router.navigate([COMPONENT_AIO.INTER_BANK_2]);
    // }
    goNext(){
        if (this.myFormGroup.invalid) {
            this.showVerificationDialog(this.findInvalidControls());
            return;
        }

        //save to session storage
        this.gd.interBankList = this.myFormGroup.getRawValue();
        console.log('測試save interBankList: ',this.gd.interBankList);

        this.router.navigate([COMPONENT_AIO.INTER_BANK_2]);
    }

    /**
     * 限制 memo 中文(8)/英數字(16) 長度
     * @param index
     */
    calculusLength(index?: number) : number{
        // console.log('index: ', index);

        const indexNum = index ? index : 0;
        const value =this.myFormGroup.controls['memo'].value;

        if(value) {

            const chineseReg = /^[\u0391-\uffe5]+$/;
            const letterReg = /^[0-9a-zA-Z]+$/;
            // console.log(value + " , length: " + value.length);

            if (chineseReg.test(value)) {
                // console.log('中文' + value + " , length: " + value.length);
                return 8;
            }else if (letterReg.test(value)) {
                return 16;
            }else{
                // console.log('else...');
                return 8;
            }
            return 8;
        }
        return 16;
    }

    test(){
        console.log(this.myFormGroup.getRawValue())
    }
}
