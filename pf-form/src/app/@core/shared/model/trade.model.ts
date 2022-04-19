import {ValidatorFn, Validators} from '@angular/forms';
import {FormValidator, FormValidatorBuilder} from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';
import {DepositCounterTraderComponent} from '../../../cash-deposit/deposit-counter-trader.component';

/**
 * 交易 (存款/提款)
 */
export class TradeModel extends BaseModel implements FormValidator<TradeModel> {

    //TODO: 要用 Array in DepositModel or DepositModel Array?

    //交易類型
    type:number;
    //身分證
    idno:string;
    //手機
    phone:string;
    //有摺
    hasPassbook: boolean;

    //本人帳戶
    isSelfAccount: boolean;

    //是否為現金 or 轉帳
    isCash: boolean;

    //本行/他行
    isOwnedBank: boolean;

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
    bankAccount: string;

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
                return [FormValidatorBuilder.required("有摺", "凱基銀行帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "帳號")];
            case 'bankAccount':
                return [FormValidatorBuilder.required("凱基銀行帳號", "凱基銀行帳號"), FormValidatorBuilder.accountLength("最小 12 位數字", "帳號")];
            case 'money':
                return [FormValidatorBuilder.required("臺幣金額", "臺幣金額")];
            case 'memo':
                // return [Validators.nullValidator, FormValidatorBuilder.required("存摺備註", "存摺備註")];
                return [Validators.nullValidator];
            case 'internationalTrade':
                return [Validators.nullValidator]; //非必填
        }
        return null;
    }


    public getDepositValidators(): any {
        return {
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
            bankAccount: [this.bankAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).bankAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
        };
    }

    public getWithdrawValidators(): any {
        return {
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
            bankAccount: [this.bankAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).bankAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
        };
    }

    public getValidators(): any {
        return {
            money: [this.money, this.getValidator(GET_BASEMODEL_FIELDNAME(this).money)],
            bankAccount: [this.bankAccount, this.getValidator(GET_BASEMODEL_FIELDNAME(this).bankAccount)],
            memo: [this.memo, this.getValidator(GET_BASEMODEL_FIELDNAME(this).memo)],
        };
    }
}
