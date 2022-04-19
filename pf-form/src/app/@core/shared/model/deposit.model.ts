import {ValidatorFn, Validators} from '@angular/forms';
import {FormValidator, FormValidatorBuilder} from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';
import {DepositCounterTraderComponent} from '../../../cash-deposit/deposit-counter-trader.component';

/**
 * 存款
 */
export class DepositModel extends BaseModel implements FormValidator<DepositModel> {

    //TODO: 要用 Array in DepositModel or DepositModel Array?


    //交易類型
    type:number = 1;

    //有摺
    hasPassbook: boolean;

    //本人帳戶
    isSelfAccount: boolean;

    //是否為現金 or 轉帳
    isCash: boolean;

    //轉帳/匯款/存款/提款 金額
    money: number;

    //臨櫃交易人姓名 (存提款)(無摺-非本人)
    counterTrader: string;

    //臨櫃交易人身分證號 (存提款)(無摺-非本人)
    counterTraderId: string;

    //臨櫃交易人聯絡電話 (存提款)(無摺-非本人)
    counterTraderPhone: string;

    //代理人姓名 (匯款)(無摺-非本人)
    agentTrader: string;

    //代理人身分證號 (匯款)(無摺-非本人)
    agentTraderId: string;

    //代理人聯絡電話 (匯款)(無摺-非本人)
    agentTraderPhone: string;


    //存入帳號 (Deprecated)
    // bankAccount: string;

    //轉出帳號
    depositAccount: string;

    //存入帳號
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
            case 'isSelfAccount':
                // return [FormValidatorBuilder.required("是否本人帳戶", "本人帳戶")];
                return [Validators.nullValidator]; //非必填
            case 'isCash':
                return [Validators.nullValidator]; //非必填
            case 'depositAccount':
                return [FormValidatorBuilder.required("凱基銀行帳號", "凱基銀行帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "帳號")];
            case 'money':
                return [FormValidatorBuilder.required("臺幣金額", "臺幣金額")];
            case 'memo':
                // return [Validators.nullValidator, FormValidatorBuilder.required("存摺備註", "存摺備註")];
                return [Validators.nullValidator]; //非必填
        }
        return null;
    }


    public getValidators(): any {
        return {
            hasPassbook: [this.hasPassbook, this.getValidator(GET_BASEMODEL_FIELDNAME(this).hasPassbook)],
            isSelfAccount: [this.isSelfAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).isSelfAccount)],
            isCash: [this.isCash, this.getValidator(GET_BASEMODEL_FIELDNAME(this).isCash)],
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
            depositAccount: [this.depositAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).depositAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
        };
    }

}
