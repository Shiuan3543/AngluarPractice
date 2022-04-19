import {ValidatorFn, Validators} from '@angular/forms';
import {FormValidator, FormValidatorBuilder} from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';

export class IntraBankModel extends BaseModel implements FormValidator<IntraBankModel> {


    //交易類型
    type:number = 3;
    //有摺
    hasPassbook: boolean;

    //轉出帳號
    remitterAccount: string;

    //存摺備註
    memo: string;

    //轉入帳號
    payeeAccount: string;

    //轉帳金額
    money: number;

    public getValidator( name: string): ValidatorFn | ValidatorFn[] | null {
        switch (name) {
            case 'hasPassbook':
                // return [Form ValidatorBuilder.required("有摺/無摺", "有摺/無摺")];
                return [Validators.nullValidator]; //非必填
            case 'remitterAccount':
                return [FormValidatorBuilder.required("轉出帳號", "轉出帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "轉出帳號")];
                // return [Validators.nullValidator];
            case 'memo':
                return [Validators.nullValidator];
            case 'payeeAccount':
                return [FormValidatorBuilder.required("轉入帳號", "轉入帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "轉入帳號")];
            case 'money':
                return [FormValidatorBuilder.required("臺幣金額", "臺幣金額")];
                // return [Validators.nullValidator];
        }
        return null;
    }

    public getValidators(): any {
        return {
            hasPassbook: [this.hasPassbook, this.getValidator(GET_BASEMODEL_FIELDNAME(this).hasPassbook)],
            remitterAccount: [this.remitterAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).remitterAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
            payeeAccount: [this.payeeAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).payeeAccount)],
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
        };
    }

}
