import { RoutingModel } from './routing.model';
import { Validators } from '@angular/forms';
import { FormValidator } from '../validator/form-validator';
import { BaseModel } from '../base/base.model';

export class UserModel extends BaseModel implements FormValidator<UserModel> {

    id: string;
    birthday: string;
    mobile: string;

    //FIXME: 資料不會進去, 需要之後 patchValue
    public getValidators(): any {
        return {
            id: [this.id, Validators.required],
            birthday: [this.birthday, Validators.nullValidator],
            mobile: [this.mobile, Validators.required]
        };
    }

}
