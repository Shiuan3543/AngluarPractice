import { FormValidator } from '../validator/form-validator';
import {ValidatorFn} from '@angular/forms';

export class BaseModel implements FormValidator<BaseModel> {

    tempValue: string;

    public static getPropName = (name: keyof BaseModel) => name;

    public getValidator(name: string): ValidatorFn | ValidatorFn[] | null {
        return undefined;
    }

    public getFormArrayValidator(name: string, index: string): ValidatorFn | ValidatorFn[] | null {
        return undefined;
    }

    public getValidators(model?: BaseModel): any {
        return {};
    }
}
