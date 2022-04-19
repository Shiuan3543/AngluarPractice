import { FormValidator } from '../validator/form-validator';
import {BaseModel} from '../base/base.model';
import {DepositModel} from './deposit.model';
import {WithdrawModel} from './withdraw.model';
export class PreFilledFormModel extends BaseModel implements FormValidator<PreFilledFormModel> {

    deposit: DepositModel = new DepositModel();

    withdraw: WithdrawModel = new WithdrawModel();

    public getValidators(): any {
        return {

        };
    }
}
