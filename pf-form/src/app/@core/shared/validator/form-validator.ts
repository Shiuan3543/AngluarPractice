import { AbstractControl, ValidatorFn } from '@angular/forms';
import moment from 'moment/moment';

export interface FormValidator<T> {
    // getValidators(model: T);
    getValidators();
}

export class FormValidatorBuilder {

    constructor() {
    }

    /**
     * Validator樣板
     * valid: 回傳 null
     * invalid: 回傳錯誤原因
     * @param data
     */
    static xxxValidator(data: string): ValidatorFn {
        return function (control) {
            const invalidMessage = {reason: '自訂'};

            return null;
        };
    }

    /**
     * 依據此control是否合法 決定要顯示的css
     * @param formGroup
     * @param controlName
     */
    static validClass(formGroup: AbstractControl, controlName: string) {
        const ctl = formGroup.get(controlName);
        if (ctl.touched) {
            return ctl.invalid ? 'is-invalid' : 'is-valid';
        } else {
            return '';
        }
    }

    /**
     * 驗證不能與驗證文字相同
     * @param str
     * @param validateName
     */
    static validatorNotEqual(str: string, validateName?: string): ValidatorFn {
        validateName = validateName || 'notequal';

        return function (control) {
            const invalidMessage = {[validateName]: {value: control.value}};

            return str === control.value ? invalidMessage : null;
        };
    }

    /**
     * 驗證英數不能遞增或遞減
     * @param flag
     * @param len
     */
    static validatorMatchIncrese(name: string, len?: number): ValidatorFn {
        console.log(name);
        let res = false;
        return function (control) {
            if (control.value.length < 4) {
                res = false;
            }
            const number = '0123456789';
            const number2 = number.split('').reverse().join('');
            const eng = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const eng2 = eng.split('').reverse().join('');
            const input = control.value;
            if (input.length >= len) {
                for (let i = 0; i < input.length; i++) {
                    if (i + len > input.length) {
                        break;
                    }
                    const matchStr = input.substr(i, len);
                    if (control.value.length > 3) {
                        if (
                            number.includes(matchStr) ||
                            number2.includes(matchStr) ||
                            eng.includes(matchStr) ||
                            eng2.includes(matchStr)
                        ) {
                            res = true;
                            return {
                                error: true,
                                message: `「網路銀行密碼」不可含有連續遞增(遞減)的${len.toString()}碼英文或數字，重新輸入`,
                                name
                            };
                        } else if (res) {
                            return {
                                error: true,
                                message: `「網路銀行密碼」不可含有連續遞增(遞減)的${len.toString()}碼英文或數字，重新輸入`,
                                name
                            };
                        }
                    }
                }
            }
        };

    }

    /**
     * 身分證 驗證器 單純本國人
     */
    static idCardValidator(name: string): ValidatorFn {
        return function (control) {
            if (!control.value || control.value === '') {
                const invalidMessage = {
                    error: true,
                    message: '請填寫身分證字號',
                    name: name
                };
                return invalidMessage;
            }

            let sum = 0;
            let id = control.value.toUpperCase();
            const firstIdText = id.slice(0, 1);
            const firstIdNum = id.slice(1, 2);

            // 判斷第一碼數字是否為合法格式中，本國人的 '1', '2'，或外國人的 '8', '9'
            if (firstIdNum !== '1' && firstIdNum !== '2') {
                const invalidMessage = {
                    error: true,
                    message: '非身分證字號格式',
                    name: name
                };
                return invalidMessage;
            }

            if (id == '') {
                return null;
            } else {

                const firstIdList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                const firstIdListPlus = [1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30];
                let firstIdTextIndex = firstIdList.indexOf(firstIdText);

                sum = sum + firstIdListPlus[firstIdTextIndex];

                // 判斷剩下的八碼 乘完權數後的sum
                const twidtwoWithEight = id.slice(1, 9);


                // 把每一個字都切開
                const twidtwoWithEightList = twidtwoWithEight.split('');

                for (let i = 0; i < twidtwoWithEightList.length; i++) {
                    sum += parseInt(twidtwoWithEightList[i]) * (8 - i);
                }
                ;

                // 產生正確的最後一碼(驗證碼);
                let right = 0;
                if (sum % 10 == 0) {
                } else {
                    right = 10 - sum % 10;
                }

                if (id.slice(9, 10).toString() === right.toString()) {

                } else {

                    return control ? {error: true, message: '非身分證字號格式', name: name} : null;
                }


                // const localTitle = /^[A-Z]{1}[1-2]{1}/;
                // const foreignTitle = /^[A-Z]{1}[A-D]{1}/;
                // const userIdTitle = control.value.slice(0, 2);
                //
                // const tab = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
                // const A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
                // const A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
                // const Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);
                //
                // if (control.value.length !== 10) {
                //     return {error: true, message: ''};
                // }

                // 本國人
                // if (localTitle.test(userIdTitle)) {
                //     let i = tab.indexOf(control.value.charAt(0));
                //     if (i === -1) {
                //         return invalidMessage;
                //     }
                //
                //     let sum = A1[i] + A2[i] * 9;
                //
                //     for (i = 1; i < 10; i++) {
                //         const v = parseInt(control.value.charAt(i), 10);
                //         if (isNaN(v)) {
                //             return invalidMessage;
                //         }
                //         sum = sum + v * Mx[i];
                //     }
                //
                //     if (sum % 10 !== 0) {
                //         return invalidMessage;
                //     }
                //     return null;
                // }
                // else if (foreignTitle.test(userIdTitle)) {
                //     // 外國人
                //     // 這邊把身分證字號轉換成準備要對應的
                //     let id = control.value;
                //      id = (tab.indexOf(control.value.substring(0, 1)) + 10) + '' +
                //     ((tab.indexOf(control.value.substr(1,1))+10) % 10) + '' + control.value.substr(2, 8);

                //     // 開始進行身分證數字的相乘與累加，依照順序乘上1987654321
                //     const snumber = parseInt(id.substr(0, 1), 10) +
                //     parseInt(id.substr(1, 1), 10) * 9 +
                //     parseInt(id.substr(2, 1), 10) * 8 +
                //     parseInt(id.substr(3, 1), 10) * 7 +
                //     parseInt(id.substr(4, 1), 10) * 6 +
                //     parseInt(id.substr(5, 1), 10) * 5 +
                //     parseInt(id.substr(6, 1), 10) * 4 +
                //     parseInt(id.substr(7, 1), 10) * 3 +
                //     parseInt(id.substr(8, 1), 10) * 2 +
                //     parseInt(id.substr(9, 1), 10);

                //     const checkNum = parseInt(id.substr(10, 1), 10);
                //     // 模數 - 總和/模數(10)之餘數若等於第九碼的檢查碼，則驗證成功
                //     if ((10 - snumber % 10) === checkNum) {
                //       return null;
                //     } else {
                //       return {error: true, message: ''};
                //     }

                // }
                // else {
                //     return invalidMessage;
                // }
            }
            ;
        };
    }

    /**
     * 身分證 驗證器 本國人+外國人
     */
    static idCardValidatorForeign(name: string): ValidatorFn {
        return function (control) {
            if (!control.value || control.value === '') {
                const invalidMessage = {
                    error: true,
                    message: '請填寫身分證字號',
                    name: name
                };
                return invalidMessage;
            }

            let sum = 0;
            let id = control.value.toUpperCase();
            const firstIdText = id.slice(0, 1);
            const firstIdNum = id.slice(1, 2);

            // 判斷第一碼數字是否為合法格式中，本國人的 '1', '2'，或外國人的 '8', '9'
            if (firstIdNum !== '1' && firstIdNum !== '2' && firstIdNum !== '8' && firstIdNum !== '9') {
                const invalidMessage = {
                    error: true,
                    message: '非身分證字號格式',
                    name: name
                };
                return invalidMessage;
            }

            if (id == '') {
                return null;
            } else {

                const firstIdList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                const firstIdListPlus = [1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30];
                let firstIdTextIndex = firstIdList.indexOf(firstIdText);

                sum = sum + firstIdListPlus[firstIdTextIndex];

                // 判斷剩下的八碼 乘完權數後的sum
                const twidtwoWithEight = id.slice(1, 9);


                // 把每一個字都切開
                const twidtwoWithEightList = twidtwoWithEight.split('');

                for (let i = 0; i < twidtwoWithEightList.length; i++) {
                    sum += parseInt(twidtwoWithEightList[i]) * (8 - i);
                }
                ;

                // 產生正確的最後一碼(驗證碼);
                let right = 0;
                if (sum % 10 == 0) {
                } else {
                    right = 10 - sum % 10;
                }

                if (id.slice(9, 10).toString() === right.toString()) {

                } else {

                    return control ? {error: true, message: '非身分證字號格式', name: name} : null;
                }
            }
            ;
        };
    }

    /**
     * 檢查輸入日期是否小於傳入年份(flag)
     *
     * @param flag
     * @param year
     * @param month
     * @param day
     */
    static ifDateLessThanYear(flag, year, month, day): ValidatorFn {

        return function (control) {
            const invalidMessage = {invalidateDate: true};

            const date = new Date();
            const yearNow = +this.datePipe.transform(date, 'yyyy');
            const monthNow = +this.datePipe.transform(date, 'MM');
            const dayNow = +this.datePipe.transform(date, 'dd');
            // console.log($filter('date')(date,'yyyy,MM,dd,HH,mm,ss'))
            // console.log(yearNow - vm.liveDate.year);
            // console.log(monthNow - vm.liveDate.month);
            // console.log(dayNow - vm.liveDate.day);

            // 3年內顯示前居住地址，不含3年前當天(例如：20140816 ~ 20170816 不顯示)
            const yearSelect = +year;
            const monthSelect = +month;
            const daySelect = +day;
            let differY, differM, ifYes;

            const leakMonth = daySelect > dayNow ? -1 : 0;
            // console.log(leakMonth);
            // console.log(monthNow);
            // console.log(monthSelect);
            // 3年內顯示前居住地址，不含3年前當天(例如：20140816 ~ 20170816 不顯示)
            differY =
                yearNow -
                yearSelect +
                (monthSelect === monthNow
                    ? daySelect > dayNow
                        ? -1
                        : 0
                    : monthSelect > monthNow
                        ? -1
                        : 0);

            differM = monthNow - monthSelect;
            if (monthSelect === monthNow) {
                differM = daySelect > dayNow ? 11 : 0;
            } else {
                if (monthSelect > monthNow) {
                    differM = 12 + differM;
                }
                differM += leakMonth;
            }

            if (differY < 0) {
                // 如果年差<0，一律0年0月
                differY = 0;
                differM = 0;
            }

            // return (ifYes = differY < flag);

            //吻合條件回傳 null, 否則回傳錯誤原因
            return (differY < flag) ? null : invalidMessage;
        };
    }

    // static minLength(minLength): ValidatorFn {
    //     return function(control) {
    //         // if (Validators.isEmptyInputValue(control.value)) {
    //         //     return null; // don't validate empty values to allow optional controls
    //         // }
    //         var length = control.value ? control.value.length : 0;
    //         return length < minLength ?
    //             {'minlength': {'requiredLength': minLength, 'actualLength': length}} :
    //             null;
    //     };
    // };

    /**
     * 檢查EMAIL重複
     * @param otpResult
     */
    static emailRepeatValidator(emailArray: string, name: string): ValidatorFn {
        return function (control) {
            const invalidMessage = {'repeatEmailCheck': 'Invalid', name: name};
            const KGI_EMAIL_POSTFIX = '@KGI.COM';

            // if (!(emailArray.length > 0 ) || !(control.value && control.value.length > 0)) {
            //   return;
            // }
            if (!(control.value && control.value.length > 0)) {
                return;
            }
            if (control.value.toString().toUpperCase().indexOf(KGI_EMAIL_POSTFIX) > -1) {
                return invalidMessage;
            }

            if (emailArray.length > 0 && emailArray.indexOf(control.value) > -1) {
                return invalidMessage;
            }
            return null;
        };
    }

    /**
     * 檢查行動電話是否正確(or是否已有其他客戶申請使用)
     * 1. 基本 mobile 格式需吻合
     * 2. /api/apply/isPhoneSuccess 回傳的結果 res.result === 'Y' -> null
     * @param mobile
     */
    static mobileValidator(name?: string): ValidatorFn {
        console.log('Using mobileValidator for: ', name);
        return function (control) {

            let invalidMessage = {error: true, message: '', name: name};
            const phone = control.value;
            const check = /^09\d{8}$/;

            if (!phone) {
                return {error: true, message: '未輸入手機號碼', name: name};
            } else {
                // console.log(phone.length);
                if (phone.length > 10) {
                    invalidMessage.message = '長度不符合';
                    return control ? {error: true, message: '長度不符合', name: name} : null;
                } else {
                    if (!check.test(phone)) {
                        invalidMessage.message = '驗證邏輯不符合';
                        return invalidMessage;
                    } else {
                        return null;
                    }
                }
            }

            if (phone === 'Y') {
                invalidMessage = null;
            } else if (phone === 'N') {
                invalidMessage.message = '手機號碼' + control.value + '已有其他客戶申請使用，請確認您的手機號碼是否正確或洽各分行辦理開戶，謝謝您！';
            } else if (!control.value || control.value.length !== 10) {
                invalidMessage.message = '格式不正確';
            }
            return invalidMessage;
        };
    }


    static loginMobileValidator(name?: string): ValidatorFn {
        console.log('Using mobileValidator for: ', name);
        return function (control) {

            let invalidMessage = {error: true, message: '', name: name};
            const phone = control.value;
            const check = /^09\d{8}$/;

            if (!phone) {
                return {error: true, message: '未輸入手機號碼', name: name};
            } else {
                // console.log(phone.length);
                if (phone.length > 10) {
                    invalidMessage.message = '長度不符合';
                    return control ? {error: true, message: '長度不符合', name: name} : null;
                } else {
                    if (!check.test(phone)) {
                        invalidMessage.message = '非手機號碼格式';
                        return invalidMessage;
                    } else {
                        return null;
                    }
                }
            }

            if (phone === 'Y') {
                invalidMessage = null;
            } else if (phone === 'N') {
                invalidMessage.message = '手機號碼' + control.value + '已有其他客戶申請使用，請確認您的手機號碼是否正確或洽各分行辦理開戶，謝謝您！';
            } else if (!control.value || control.value.length !== 10) {
                invalidMessage.message = '格式不正確';
            }
            return invalidMessage;
        };
    }

    /**
     * 驗證英數不能連續出現三次
     * @param flag
     * @param len
     */
    static validatorMatchSame(name: string, len?: number): ValidatorFn {
        let res = false;
        return function (control) {
            if (control.value.length < 3) {
                res = false;
            }
            const input = control.value;
            let temp = input[0];
            let count = 0;
            if (input.length >= len) {
                for (let i = 0; i < input.length; i++) {
                    if (control.value.length > 2) {
                        if (temp === input[1]) {
                            count++;
                            if (len === count) {
                                res = true;
                                return {
                                    error: true,
                                    message: `「網路銀行密碼」不可含有連續${len.toString()}碼相同的英文或數字，重新輸入`,
                                    name
                                };
                            } else if (res) {
                                return {
                                    error: true,
                                    message: `「網路銀行密碼」不可含有連續${len.toString()}碼相同的英文或數字，重新輸入`,
                                    name
                                };
                            }
                        }
                    }
                }
            }
        };
    }

    /**
     * 檢查市內電話區碼
     * @param control
     */
    static validatorTelAreaCode(telAreaCode: string, name?: string): ValidatorFn {
        return function (control) {
            const invalidMessage = {
                error: true,
                message: '市內電話區碼格式不正確',
                name: name
            };

            let res = false;
            if (!(control.value && control.value.length > 0)) {
                return;
            }
            const input = control.value;
            const orignCode = input.replace(' ', '');
            const areaCodeLen = orignCode.length;
            let allowAreaCode = '';
            // console.log('areaCodeLen = ' + areaCodeLen);
            switch (areaCodeLen) {
                case 4:
                    allowAreaCode = '0836,0826';
                    break;
                case 3:
                    allowAreaCode = '037,049,082,089';
                    break;
                case 2:
                    allowAreaCode = '02,03,04,05,06,07,08';
                    break;
            }
            // console.log('inputAreaCode = ' + orignCode);
            // console.log('allowAreaCode = ' + allowAreaCode);

            if (allowAreaCode.indexOf(orignCode) === -1) {
                res = true;
            } else {
                res = false;
            }
            // console.log(res);
            return res ? invalidMessage : null;
        };
    }

    /**
     * 檢查市內電話區碼 '-' 做分隔
     * @param control
     */
    static validatorTelAreaCodeSeparate(name?: string,ctName?: string): ValidatorFn {
        // console.log('validatorTelAreaCodeSeparate: ', telAreaCode);
        // console.log('length: ', telAreaCode.length);
        return function (control) {
            const invalidMessage = {
                error: true,
                message: '市內電話區碼格式不正確',
                name: name
            };
            
            if (!control.value)
                return invalidMessage;

            let res = true;

            // if (telAreaCode.length === 0) {
            //     console.log('0');
            //
            // } else if (telAreaCode.length <= 1) {
            //     console.log('1');
            //
            // } else if (telAreaCode.length <= 6) {
            //     console.log('2');
            //     if((telAreaCode.startsWith('037') || telAreaCode.startsWith('049')  || telAreaCode.startsWith('089'))) {
            //
            //     }else {
            //
            //     }
            // } else if (telAreaCode.length < 10) {
            //     console.log('3');
            //     if((telAreaCode.startsWith('037') || telAreaCode.startsWith('049')  || telAreaCode.startsWith('089'))) {
            //
            //     }else{
            //
            //     }
            // } else {
            //     console.log('4');
            //     //02, 04, 049 十碼, 其他九碼
            //     if((!telAreaCode.startsWith('02') || !telAreaCode.startsWith('04')  || !telAreaCode.startsWith('049'))) {
            //
            //     }
            //     if((telAreaCode.startsWith('037') || telAreaCode.startsWith('049')  || telAreaCode.startsWith('089'))) {
            //
            //     }else{
            //
            //     }
            // }
            if (control.value.length < 10) {
                invalidMessage.error = false;
                invalidMessage.message = '請填寫完整電話號碼';
            } else if (control.value.length == 10 && (control.value.startsWith('02') || (ctName === '臺中市'&&control.value.startsWith('02')))) {
                invalidMessage.error = false;
                invalidMessage.message = '請填寫完整電話號碼';
            } else {
                res = false;
            }

            // console.log(res);
            return res ? invalidMessage : null;
        };
    }

    /**
     * 檢查公司電話格式
     * TODO: corpTelArea/corpTel? from D3, 有問題, 謹慎使用
     * @param formGroup
     */
    static validCorpTel(): ValidatorFn {

        return function (control) {
            const invalidMessage = 'is-invalid';

            const cortTelAreaControl = control.get('corpTelArea');
            const cortTelControl = control.get('corpTel');
            let res = false;
            const input = cortTelAreaControl.value;
            if (input === '02' && (cortTelControl.value.substr(0, 1) === '0' || cortTelControl.value.length < 6)) {
                res = true;
            } else {
                res = false;
            }
            return res ? invalidMessage : this.validClass(control, 'corpTel');
        };
    }


    // static birthdayValidator(): ValidatorFn {
    //     return function(control)
    //     {
    //         console.log('cc: ', control.value);
    //
    //         let birthday = control.value.toString();
    //         let monthNum = parseInt(birthday.slice(5, 7), 10);
    //         let dayNum = parseInt(birthday.slice(8, 10), 10);
    //         console.log("monthNum", monthNum);
    //
    //         console.log("dayNum", dayNum);
    //         if (birthday == "") {
    //             return null;
    //
    //         } else {
    //
    //             if (control.value.length > 11) {
    //                 return control ? {error: true, message: '長度不符合'} : null;
    //             } else {
    //                 if (birthday[4] != "/" && birthday[7] != "/") {
    //                     return control ? {birthdayTypeError: '格式不符合'} : null;
    //
    //                 } else if (monthNum > 12 || dayNum > 31) {
    //                     return control ? {birthdayTypeError: '格式不符合'} : null;
    //
    //                 } else {
    //                     let birthdayNum = parseInt(birthday.replace(/\//g, ''), 10);
    //                     let nowDate = new Date();
    //                     let nowYear = new Date().toString();
    //                     let nowYearNum = parseInt(nowYear.slice(11, 15), 10) - 1911;
    //                     console.log(birthdayNum);
    //                     let nowDateNum = parseInt(nowYearNum + '' + (nowDate.getMonth() + 1) + '' + nowDate.getDate(), 10);
    //                     console.log(nowDateNum);
    //
    //                     if (birthdayNum > nowDateNum) {
    //                         return control ? {error: true, message: '日期不能大於今天'} : null;
    //
    //                     } else {
    //
    //                         return null;
    //
    //                     }
    //                 }
    //             }
    //
    //         }
    //     }
    // }

    /**
     * 檢查日期格式
     * @param formGroup
     */
    static dateValidator(name: string): ValidatorFn {
        return function (control) {
            // console.log('control.value: ', control.value);
            const invalidMessage = {
                error: true,
                message: '日期格式錯誤',
                name: name
            };
            if (control && control.value && !moment(control.value, 'YYYYMMDD', true).isValid()) {
                return invalidMessage;
            }
            return null;
        };
    }

    /**
     * 檢查輸入數值是否符合貸款金額規範
     * @param formGroup
     */
    static amountValidator(name: string): ValidatorFn {
        return function (control) {
            const invalidMessage = {error: true, message: '申請金額限制為 3 ~ 800萬', name: name};
            // console.log("amount: ", control.value);
            if (control.value >= 3 && control.value <= 800) {
                return;
            }
            if (control.value === 0 || (control.value === 1 || control.value === 2) || control.value > 800) {
                return control ? invalidMessage : null;
            }
        };
    }

    /**
     * 檢查輸入數值是否符合貸款額度規範
     * @param formGroup
     */
    static quotaValidator(name: string): ValidatorFn {
        return function (control) {
            const invalidMessage = {error: true, message: '申請金額限制為 1 ~ 100萬', name: name};
            // console.log("amount: ", control.value);
            if (control.value >= 1 && control.value <= 100) {
                return;
            }
            if (control.value === 0 || control.value === 1 || control.value > 100) {
                return control ? invalidMessage : null;
            }
        };
    }

    static homePhoneValidator(control: AbstractControl) {
        return function (control) {
            const invalidMessage = {error: true, message: ''};

            if (control.value.length > 11) {
                invalidMessage.message = '長度不符合';
                return invalidMessage;
            } else {
                const phone = control.value;
                const patt = /0\d{1,2}-\d{7,8}$/;

                if (!patt.test(phone)) {
                    invalidMessage.message = '驗證邏輯不符合';
                    return invalidMessage
                }
            }
            return null;
        };

    }

    /**
     * 檢查欄位是否有值
     * @param formGroup
     */
    static required(message: string, _name: string): ValidatorFn {
        return function (control) {
            const invalidMessage = {error: true, message: message, name: _name};
            if (!control.value) {
                return invalidMessage;
            }
        };
    }

    /**
     * 檢查帳號長度
     * @param formGroup
     */
    static accountLength(message: string, _name: string): ValidatorFn {
        return function (control) {
            //console.warn("accountLength =", control.value);
            const invalidMessage = {error: true, message: message, name: _name};
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `最小 12 位數字`,
                    name: _name
                };
                return invalidMessage;
            }
            if(control.value.length < 12){
                const invalidMessage = {
                    error: true,
                    message: message,
                    name: _name
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 檢查信用卡卡號長度
     * @param formGroup
     */
    static creditCardNum(message: string, _name: string): ValidatorFn {
        return function (control) {
            console.warn("creditCardNum =", control.value);
            const invalidMessage = {error: true, message: message, name: _name};
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入信用卡卡號`,
                    name: _name
                };
                return invalidMessage;
            }
            if(control.value.length !== 16){
                const invalidMessage = {
                    error: true,
                    message: message,
                    name: _name
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 檢查信用卡有效日期
     * @param formGroup
     */
    static effectiveCreditCard(message: string, _name: string): ValidatorFn {
        return function (control) {
            console.warn("creditCardNum =", control.value);
            const effectiveArray = control.value.split('/');
            const month = effectiveArray[0] as number;
            const year = effectiveArray[1] as number;
            const invalidMessage = {error: true, message: message, name: _name};
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入信用卡有效日期`,
                    name: _name
                };
                return invalidMessage;
            }
            if(month && month > 12){
                const invalidMessage = {
                    error: true,
                    message: message,
                    name: _name
                };
                return invalidMessage;
            }
        };
    }


    /**
     * 驗證使用者代號
     * @param formGroup
     */
    static userIdValidator(idno: string, validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (
                !!control.value &&
                !!control.value.match &&
                control.value !== idno &&
                control.value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,12}$/)
            ) {
                return null;
            } else if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入「使用者代號」`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value.length > 0 && control.value.length < 6 && control.value.match(/[A-Za-z0-9]/)) {
                const invalidMessage = {
                    error: true,
                    message: '「使用者代號」需為 6 ~ 12 位英數混合，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            } else if (control.value.match(/^[a-zA-Z0-9]{6,12}$/) && control.value !== idno) {
                const invalidMessage = {
                    error: true,
                    message: `「使用者代號」需為 6 ~ 12 位英數混合，英文大小寫視為不同字，請重新輸入`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value.match(/[^A-Za-z0-9]/)) {
                const invalidMessage = {
                    error: true,
                    message: '請勿輸入特殊字元',
                    name: name
                };
                return invalidMessage;
            } else if (control.value === idno) {
                const invalidMessage = {
                    error: true,
                    message: '「使用者代號」不可與身分證字號相同，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            }
        }
    }

    /**
     * 驗證網路銀行密碼
     * @param formGroup
     */
    static onlineBankPwdValidator(idno: string, userId: string, validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (
                !!control.value &&
                !!control.value.match &&
                control.value !== idno &&
                control.value !== userId &&
                control.value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,16}$/)
            ) {
                return null;
            } else if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入「銀行密碼」`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value.length > 0 && control.value.length < 6 && control.value.match(/[A-Za-z0-9]/)) {
                const invalidMessage = {
                    error: true,
                    message: '「銀行密碼」需為 6 ~ 16 位英數混合，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            } else if (control.value.match(/^[a-zA-Z0-9]{6,16}$/) && control.value !== idno && control.value !== userId) {
                const invalidMessage = {
                    error: true,
                    message: `「銀行密碼」需為 6 ~ 16 位英數混合，英文大小寫視為不同字，請重新輸入`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value.match(/[^A-Za-z0-9]/)) {
                const invalidMessage = {
                    error: true,
                    message: '請勿輸入特殊字元',
                    name: name
                };
                return invalidMessage;
            } else if (control.value === idno) {
                const invalidMessage = {
                    error: true,
                    message: '「銀行密碼」不可與身分證字號相同，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            } else if (control.value === userId) {
                const invalidMessage = {
                    error: true,
                    message: '「銀行密碼」不可與「使用者代號」相同，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 驗證確認網路銀行密碼
     * @param formGroup
     */
    static confirmPwdValidator(password: string, validateName: string, name: string, message: string): ValidatorFn {
        return function (control) {
            if (!control.value.match(password)) {
                const invalidMessage = {
                    error: true,
                    message,
                    name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 驗證電話銀行密碼
     * @param formGroup
     */
    static phoneBankPwdValidator(userId: string, validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (
                !!control.value &&
                !!control.value.match &&
                control.value.match(/^(?=.*\d){6,8}$/)
            ) {
                return null;
            } else if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入「電話銀行密碼」`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value.length > 0 && control.value.length < 6 && control.value.match(/\d/)) {
                const invalidMessage = {
                    error: true,
                    message: '「電話銀行密碼」需為 6 ~ 8 位數字，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            } else if (control.value.match(/\D/)) {
                const invalidMessage = {
                    error: true,
                    message: '請勿輸入特殊字元',
                    name: name
                };
                return invalidMessage;
            } else if (control.value === userId) {
                const invalidMessage = {
                    error: true,
                    message: '「電話銀行密碼」不可與「使用者代號」相同，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            }
        };
    }


    /**
     * 檢查輸入數值是否符合年收入規範
     * 「自由業/家管/學生」或「無業/退休人士」 20 ~ 9999
     *  其他 25 ~ 9999
     * @param formGroup
     */
    static yearIncomeValidator(name: string, lowerLimit: number, upperLimit: number): ValidatorFn {
        return function (control) {
            // console.log("control.value: ", control.value);
            const money = control.value as number;
            const invalidMessage = {
                error: true,
                message: '年收入限制為' + lowerLimit + '~' + upperLimit + '萬',
                name: name
            };
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入年收入`,
                    name: name
                };
                return invalidMessage;
            } else if (money >= lowerLimit && money <= upperLimit) {
                console.log("control.value: lowerLimit");
                return null;
            } else if (money === 0 || (money < lowerLimit) || money > upperLimit) {
                return control ? invalidMessage : null;
            }
        };
    }

    /**
     * 檢查輸入年月是否超過現在時間
     * @param formGroup
     */
    static yearMonthValidator(message: string, _name: string): ValidatorFn {
        return function (control) {
            // 選擇時間
            const date = (control.value as string).split('-');
            const year = Number(date[0]);
            const month = Number(date[1]);
            // 現在時間
            const nowDate = new Date();
            const nowYear = nowDate.getFullYear();
            const nowMonth = nowDate.getMonth();

            const invalidMessage = {
                error: true,
                message: message,
                name: _name
            };


            if (year && (year === nowYear)) {
                if (month && (month > (nowMonth + 1))) {
                    return invalidMessage;
                }
                return;
            } else if (year && year > nowYear) {
                return invalidMessage;
            } else {
                return;
            }

        };
    }

    // /**
    //  * 檢查輸入數值是否符合「自由業/家管/學生」或「無業/退休人士」年收入規範
    //  * @param formGroup
    //  */
    // static exceptionalYearIncomeValidator(name: string): ValidatorFn {
    //     return function (control) {
    //         const invalidMessage = {
    //             error: true,
    //             message: '年收入限制為 20 ~ 9999萬',
    //             name: name
    //         };
    //         console.log("control.value: ", control.value);
    //         return null;
    //     };
    // }

    /**
     * 驗證出生年份是否符合規範
     * @param formGroup
     */
    static birthYearValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            const thisYearNum = new Date().getFullYear();
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入${name}`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value === '0000' || Number(control.value) > thisYearNum) {
                const invalidMessage = {
                    error: true,
                    message: `您所輸入的${name}格式不符`,
                    name: name,
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 驗證出生年份是否符合規範
     * @param formGroup
     */
     static twBirthYearValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            const thisYearNum = new Date().getFullYear() - 1911;
            
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入${name}`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value === '000' || Number(control.value) > thisYearNum) {
                const invalidMessage = {
                    error: true,
                    message: `您所輸入的${name}格式不符`,
                    name: name,
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 驗證出生月份是否符合規範
     * @param formGroup
     */
    static birthMonthValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入${name}`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value === '00') {
                const invalidMessage = {
                    error: true,
                    message: `您所輸入的${name}格式不符`,
                    name: name,
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 驗證出生日期是否符合規範
     * @param formGroup
     */
    static birthDateValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入${name}`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value === '00') {
                const invalidMessage = {
                    error: true,
                    message: `您所輸入的${name}格式不符`,
                    name: name,
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 驗證銀行帳號
     * @param formGroup
     */
    static bankAccountValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (
                !!control.value &&
                !!control.value.match &&
                control.value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{0,14}$/)
            ) {
                return null;
            } else if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入「銀行帳號」`,
                    name: name
                };
                return invalidMessage;
            } else if (control.value.length > 0 && control.value.length < 10) {
                const invalidMessage = {
                    error: true,
                    message: '「銀行帳號」需為 10 ~ 14 碼，請重新輸入',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            }
        };
    }

    /**
     * 信箱格式
     * @param formGroup
     */
    static emailValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            if (
                control.value &&
                control.value.match &&
                !control.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,)
            ) {
                const invalidMessage = {
                    error: true,
                    message: '電子信箱格式錯誤',
                    name: name,
                    [validateName]: {value: control.value}
                };
                return invalidMessage;
            } else if (!control.value) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入「電子信箱」`,
                    name: name
                };
                return invalidMessage;
            }
            return null;
        };
    }

    /**
     * 驗證碼6碼數字
     * @param formGroup
     */
    static verifyCodeValidator(validateName: string, name: string): ValidatorFn {
        return function (control) {
            const data = control.value ? control.value.toString() : '';
            if (
                data &&
                data.match &&
                !data.match(/^\d{6}$/)
            ) {
                console.log('inini');
                const invalidMessage = {
                    error: true,
                    message: '請輸入正確驗證碼',
                    name: name,
                    [validateName]: {value: data}
                };
                return invalidMessage;
            } else if (!data) {
                const invalidMessage = {
                    error: true,
                    message: `請輸入正確驗證碼`,
                    name: name
                };
                return invalidMessage;
            }
            return null;
        };
    }

    static checkRepeatEmail(validateName: string, name: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if(!sessionStorage.getItem("_aioRoutingType").includes("d3")){
                console.warn("非數三功能 無需檢查公務信箱");
                return
            }
            if (!(control.value && control.value.length > 0)) {
                return;
            }
            if (control.value.toString().toUpperCase().indexOf('@KGI.COM') > -1) {
                return {
                    error: true,
                    message: `不得以公務信箱申請開戶，請重新輸入`,
                    name: name
                };
            }
            return null;
        };
    }

    static corpNameSearch(validateName: string, name: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const compilation = control.value as string;
            const isNum = compilation.match(/^[0-9]*$/g);// 是否為數字
            const numCheck = compilation.match(/^[0-9]{9,}$/g);// 是否超過八碼
            const numMinCheck = compilation.match(/^[0-9]{8,}$/g);// 是否超過八碼
            if (!compilation) {
                return{
                    error: true,
                    message: validateName,
                    name: name
                };
            }

            if ((isNum && numCheck)) {
                return{
                    error: true,
                    message: `統編請勿超過8碼`,
                    name: name
                };
            }

            if ((isNum && !numMinCheck)) {
                return{
                    error: true,
                    message: `統編請輸入8碼`,
                    name: name
                };
            }
            return null;
        };
    }

    /**
     * 年紀檢核 動態算出區間
     * @param validateName
     * @param name
     */
    static ageCalculate(validateName: string, name: string, minAge: number, maxAge: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const compilation = control.value as string;
            const userYear = Number(compilation.substr(0,4));
            const userMonth = Number(compilation.substr(4,2));
            const userDay = Number(compilation.substr(6,2));

            const nowDate = new Date();
            const minYear = nowDate.getFullYear()-minAge; // 最小年紀
            const maxYear = nowDate.getFullYear()-maxAge; // 最大年紀
            const month = nowDate.getMonth() + 1;
            const day = nowDate.getDate();


            if (userYear > minYear || userYear < maxYear) {
                return {
                    error: true,
                    message: validateName,
                    name: name
                };
            } else if(userYear == minYear || userYear == maxYear){
                if (userMonth > month) {
                    console.warn("userMonth > month");
                    return {
                        error: true,
                        message: validateName,
                        name: name
                    };
                } else if (userMonth == month) {
                    if (userDay > day) {
                        console.warn("userDay > day");
                        return {
                            error: true,
                            message: validateName,
                            name: name
                        };
                    }
                }
            }
            return null;
        };
    }
}
