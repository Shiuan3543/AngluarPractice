import {ValidatorFn, Validators} from '@angular/forms';
import { FormValidator, FormValidatorBuilder } from '../validator/form-validator';
import { BaseModel } from 'src/app/@core/shared/base/base.model';
import {GET_BASEMODEL_FIELDNAME} from '../app.constants';

export class ApplyStartVO extends BaseModel implements FormValidator<ApplyStartVO> {


    // 身分證
    idno: string;

    // 手機
    phone: string;


    id:number;
    //長網址
    longUrl:string;
    //短網址
    shortUrl:string = " ";


    // 本人已閱讀並同意下列條款及告知事項
    ch1: boolean;

    public getValidator( name: string): ValidatorFn | ValidatorFn[] | null {
        switch (name) {
            case 'idno':
                return [Validators.required, FormValidatorBuilder.idCardValidator("身分證字號")];
            case 'phone':
                return [Validators.required, FormValidatorBuilder.loginMobileValidator("手機號碼")];
            case 'ch1':
                return [FormValidatorBuilder.required("請勾選同意條款", "同意條款")];
        }
        return null;
    }

    public getValidators(): any {
        return {
            idno: [this.idno, this.getValidator(GET_BASEMODEL_FIELDNAME(this).idno)],

            phone: [this.phone, this.getValidator(GET_BASEMODEL_FIELDNAME(this).phone)],

            ch1: [this.ch1, this.getValidator(GET_BASEMODEL_FIELDNAME(this).ch1)],
        };
    }

}
