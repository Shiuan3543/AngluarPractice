import {ValidatorFn, Validators} from '@angular/forms';
import {FormValidator, FormValidatorBuilder} from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';

export class InterBankModel extends BaseModel implements FormValidator<InterBankModel> {


    //交易類型
    type:number = 4;
    //收款戶名
    payeeName: string;

    //收款帳號
    payeeAccount: string;

    //收款銀行ID
    payeeBankId: string;

    //收款銀行
    payeeBankName: string;

    //匯款附言
    memo: string;

    //扣款帳號
    remitterAccount: string;

    //匯款金額
    money: number;

    //匯款方式 1: 存摺扣款匯款, 2: 現金匯款
    transactionType: number;

    bankAccount: string;

    //匯款人姓名
    remitterName: string;

    //匯款人身分證字號
    remitterIdno: string;

    //匯款人電話
    remitterPhone: string;

    isAgent: boolean;

    //代理人姓名
    agentName: string;

    //代理人身分證字號
    agentIdno: string;

    //代理人電話
    agentPhone: string;

    public getValidator( name: string): ValidatorFn | ValidatorFn[] | null {
        switch (name) {
            case 'payeeName':
                return [FormValidatorBuilder.required("收款戶名", "收款戶名")];
            case 'payeeAccount':
                return [FormValidatorBuilder.required("收款帳號", "收款帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "收款帳號")];
            case 'payeeBankId':
                // return [FormValidatorBuilder.required("收款銀行代碼", "收款銀行代碼")];
                return [Validators.nullValidator]; //暫時不檢查
            case 'payeeBankName':
                // return [FormValidatorBuilder.required("請輸入收款銀行", "收款銀行")];
                return [Validators.nullValidator]; //暫時不檢查
            case 'memo':
                return [Validators.nullValidator, FormValidatorBuilder.required("存摺備註", "存摺備註")];
            case 'money':
                return [FormValidatorBuilder.required("匯款金額", "匯款金額")];
            case 'remitterAccount':
                return [FormValidatorBuilder.required("扣款帳號", "扣款帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "扣款帳號")];
            case 'transactionType':
                return [FormValidatorBuilder.required("交易方式", "交易方式")];
            case 'remitterName':
                return [FormValidatorBuilder.required("請輸入姓名", "匯款人")];
            case 'remitterIdno':
                return [FormValidatorBuilder.required("請輸入身分證字號", "匯款人")];
            case 'remitterPhone':
                return [FormValidatorBuilder.required("請輸入電話", "匯款人")];
            case 'isAgent':
                return [Validators.nullValidator]; //非必填
            case 'agentName':
                return [Validators.nullValidator, FormValidatorBuilder.required("請輸入代理人", "代理人")];
            case 'agentIdno':
                return [Validators.nullValidator, FormValidatorBuilder.required("請輸入代理人身分證字號", "代理人身分證字號")];
            case 'agentPhone':
                return [Validators.nullValidator, FormValidatorBuilder.required("請輸入代理人電話", "代理人電話")];
        }
        return null;
    }


    public getValidators(): any {
        return {
            payeeName: [this.payeeName, this.getValidator(GET_BASEMODEL_FIELDNAME(this).payeeName)],
            payeeAccount: [this.payeeAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).payeeAccount)],
            payeeBankId: [this.payeeBankId, this.getValidator(GET_BASEMODEL_FIELDNAME(this).payeeBankId)],
            payeeBankName: [this.payeeBankName, this.getValidator(GET_BASEMODEL_FIELDNAME(this).payeeBankName)],
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
            remitterAccount: [this.remitterAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).remitterAccount)],
            transactionType: [this.transactionType, this.getValidator(GET_BASEMODEL_FIELDNAME(this).transactionType)],
            bankAccount: [this.bankAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).bankAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
            remitterName: [this.remitterName, this.getValidator(GET_BASEMODEL_FIELDNAME(this).remitterName)],
            remitterIdno: [this.remitterIdno, this.getValidator(GET_BASEMODEL_FIELDNAME(this).remitterIdno)],
            remitterPhone: [this.remitterPhone, this.getValidator(GET_BASEMODEL_FIELDNAME(this).remitterPhone)],
            isAgent: [this.isAgent, this.getValidator(GET_BASEMODEL_FIELDNAME(this).isAgent)],
            agentName: [this.agentName, this.getValidator(GET_BASEMODEL_FIELDNAME(this).agentName)],
            agentIdno: [this.agentIdno, this.getValidator(GET_BASEMODEL_FIELDNAME(this).agentIdno)],
            agentPhone: [this.agentPhone, this.getValidator(GET_BASEMODEL_FIELDNAME(this).agentPhone)],
        };
    }

}
