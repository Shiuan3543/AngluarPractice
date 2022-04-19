import {ValidatorFn, Validators} from '@angular/forms';
import {FormValidator, FormValidatorBuilder} from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';

/**
 * 提款
 */
export class WithdrawModel extends BaseModel implements FormValidator<WithdrawModel> {


    //交易類型
    type:number = 2;
    //有摺
    hasPassbook: boolean;

    //本人帳戶
    isSelfAccount: boolean;

    //是否為現金 or 轉帳
    isCash: boolean;

    //轉帳/匯款/存款/提款 金額
    money: number;

    //提款帳號
    withdrawAccount: string;

    //收款銀行
    withdrawBank: string;

    //收款分行
    withdrawBankBranch: string;

    //存摺備註
    memo: string;

    public getValidator( name: string): ValidatorFn | ValidatorFn[] | null {
        switch (name) {
            case 'hasPassbook':
                // return [FormValidatorBuilder.required("有摺/無摺", "有摺/無摺")];
                return [Validators.nullValidator]; //非必填
            case 'isCash':
                return [Validators.nullValidator]; //非必填
            case 'withdrawAccount':
                return [FormValidatorBuilder.required("凱基銀行帳號", "凱基銀行帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "帳號")];
            case 'money':
                return [FormValidatorBuilder.required("臺幣金額", "臺幣金額")];
            case 'memo':
                return [Validators.nullValidator];
        }
        return null;
    }


    public getValidators(): any {
        return {
            hasPassbook: [this.hasPassbook, this.getValidator(GET_BASEMODEL_FIELDNAME(this).hasPassbook)],
            isCash: [this.isCash, this.getValidator(GET_BASEMODEL_FIELDNAME(this).isCash)],
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
            withdrawAccount: [this.withdrawAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).withdrawAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
        };
    }

}
