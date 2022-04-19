import {ValidatorFn, Validators} from '@angular/forms';
import {FormValidator, FormValidatorBuilder} from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';
import {DepositCounterTraderComponent} from '../../../cash-deposit/deposit-counter-trader.component';

/**
 * 存款
 */
export class TraderModel extends BaseModel implements FormValidator<TraderModel> {

    //臨櫃交易人姓名 (存提款)(無摺-非本人)
    counterTrader: string;

    //臨櫃交易人身分證號 (存提款)(無摺-非本人)
    counterTraderId: string;

    //臨櫃交易人聯絡電話 (存提款)(無摺-非本人)
    counterTraderPhone: string;

    public getValidator( name: string): ValidatorFn | ValidatorFn[] | null {
        switch (name) {
            case 'counterTrader':
                return [FormValidatorBuilder.required("存款人姓名", "存款人姓名")];
            case 'counterTraderId':
                return [FormValidatorBuilder.required("身分證字號", "身分證字號")];
            case 'counterTraderPhone':
                return [FormValidatorBuilder.required("聯絡電話", "聯絡電話")];
                return [Validators.nullValidator];
            case 'internationalTrade':
                return [Validators.nullValidator]; //非必填
        }
        return null;
    }


    public getValidators(): any {
        return {
            counterTrader: [this.counterTrader, this.getValidator(GET_BASEMODEL_FIELDNAME(this).counterTrader)],
            counterTraderId: [this.counterTraderId, this.getValidator(GET_BASEMODEL_FIELDNAME(this).counterTraderId)],
            counterTraderPhone: [this.counterTraderPhone, this.getValidator(GET_BASEMODEL_FIELDNAME(this).counterTraderPhone)],
        };
    }

}
