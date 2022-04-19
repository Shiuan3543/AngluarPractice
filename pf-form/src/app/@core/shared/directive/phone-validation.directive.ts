import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

/**
 * 市內電話 + 手機號碼 Validator
 */
@Directive({
    selector: '[formControlName][phoneValidator]',
})
export class PhoneMaskDirective {

    constructor(public ngControl: NgControl) {
    }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
        this.onInputChange(event.target.value, true);
    }

    @HostListener('focusout', ['$event'])
    focusout(event) {
        this.onInputChange(event.target.value, true);
    }

    //02, 04, 049 十碼, 其他九碼
    onInputChange(event, backspace) {
        if(!event) return;
        let rawValue = event.replace(/[\D\s-]/g, ''); //移除 非數字/空白
        rawValue = rawValue.replace(/^([^0])/g, ''); //移除非 0 開頭的
        if (rawValue.length <= 2) {
            rawValue = rawValue.replace(/[0][(0|1)]/g, '0'); //移除 00,01 開頭
        }

        // console.log('rawValue (start):', rawValue);
        // console.log('rawValue (length):', rawValue.length);
        // console.log('backspace: ' + backspace + ' / rawValue: ' + rawValue)

        if (backspace && rawValue.length === 2) {
            rawValue = rawValue.substring(0, rawValue.length);
        }

        if (rawValue.length === 0) {
            rawValue = '';
        } else if (rawValue.length <= 1) {
            // console.log('1');
            rawValue = rawValue.replace(/^(\d{0,2})/, '$1');
        } else if (rawValue.length === 2) {
            rawValue = rawValue.replace(/^(\d{0,2})(\d{0,2})/, '$1$2');
        } else if (rawValue.length === 3) {
            // console.log('2');

            if(rawValue.startsWith('09')) {
                rawValue = rawValue.replace(/^(\d{0,4})(\d{0,6})/, '$1$2');
            } else if((rawValue.startsWith('037') || rawValue.startsWith('049')  || rawValue.startsWith('089'))) {
                rawValue = rawValue.replace(/^(\d{0,3})(\d{0,6})/, '$1$2');
            }else {
                rawValue = rawValue.replace(/^(\d{0,2})(\d{0,8})/, '$1-$2');
            }
        } else if (rawValue.length < 10) {
            // console.log('3');
            if(rawValue.startsWith('09')) {
                rawValue = rawValue.replace(/^(\d{0,4})(\d{0,6})/, '$1$2');
            } else if((rawValue.startsWith('037') || rawValue.startsWith('049')  || rawValue.startsWith('089'))) {
                rawValue = rawValue.replace(/^(\d{0,3})(\d{0,6})/, '$1-$2');
            }else{
                rawValue = rawValue.replace(/^(\d{0,2})(\d{0,8})/, '$1-$2');
            }
        } else {
            // console.log('4');
            //rawValue = rawValue.substring(0, 10);
            //02, 04, 049 十碼, 其他九碼
            // console.log(rawValue.startsWith('02'))

            //截掉超過字元
            if(rawValue.startsWith('09')) { //截掉超過字元
                rawValue = rawValue.substring(0, 10);
            } else if((!rawValue.startsWith('02') && !rawValue.startsWith('04') && !rawValue.startsWith('049'))) {
                rawValue = rawValue.substring(0, 9);
            }

            if(rawValue.startsWith('09')) {
                rawValue = rawValue.replace(/^(\d{0,4})(\d{0,6})/, '$1$2');
            } else if((rawValue.startsWith('037') || rawValue.startsWith('049')  || rawValue.startsWith('089'))) {
                rawValue = rawValue.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
            }else{
                rawValue = rawValue.replace(/^(\d{0,2})(\d{0,4})/, '$1-$2');
            }
        }

        // console.log('rawValue (final):', rawValue);
        // console.log('rawValue (length):', rawValue.length);

        this.ngControl.valueAccessor.writeValue(rawValue);
    }

}
