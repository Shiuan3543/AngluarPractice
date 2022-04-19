import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'preFilledTypePipe'
})
export class PreFilledTypePipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        let preFix = '';
        let postFix = '';
        console.log('value: ', value);
        console.log('args: ', args);

        if (value === true) {
            preFix = '現金';
        } else {
            preFix = '本行';
        }
        if( args && args[0] ) {
            postFix = '存款';
        }else if( args && args[1] ) {
            postFix = '提款';
        }

        return preFix + postFix;
    }
}
