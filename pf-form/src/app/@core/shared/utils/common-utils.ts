
/**
 *  驗證台灣身分證
 * @see  cc system common.js :173
 * @param {string } id
 * @return {boolean}  true is id verify  ;false if not pass verify
 * */
export function checkID(id:string):boolean {

    const tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
    const A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
    const A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
    const Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

    if (id.length != 10)
        return false;
    let j = tab.indexOf(id.charAt(0));
    if (j == -1)
        return false;
    let sum = A1[j] + A2[j] * 9;

    for (let i = 1; i < 10; i++) {
        const v = parseInt(id.charAt(i));
        if (isNaN(v)) return false;
        sum = sum + v * Mx[i];
    }
    return sum % 10 == 0;
}

export function copyUrl(text:string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);


}

export function processAddressToDeliveryData(address) {
    const deliveryData = {
        city: '',
        district: '',
        address: '',
    }
    console.log("processAddress : " , address);
    deliveryData.city = address.substring(0, address.indexOf("縣") > -1 ?
        address.indexOf("縣") + 1 : address.indexOf("市") > -1 ? address.indexOf("市") + 1 : "");
    // 先切掉前面  避免 宜蘭縣宜蘭市  宜蘭縣釣魚臺
    console.log('a', address.split(deliveryData.city)[1])
    const district = address.split(deliveryData.city)[1];
    //  避免 先取到鎮 或市 導致地址不完整
    if (district.substring(0, 3) === '前鎮區' ||district.substring(0, 3) === '平鎮區'||district.substring(0, 3) === '左鎮區'||district.substring(0, 3) === '新市區') {
        deliveryData.district = district.substring(0, 3);
    } else {
        deliveryData.district = district.substring(
            0,
            district.indexOf('鄉') > -1
                ? district.indexOf('鄉') + 1
                : district.indexOf('鎮') > -1
                    ? district.indexOf('鎮') + 1
                    : district.indexOf('市') > -1
                        ? district.indexOf('市') + 1
                        : district.indexOf('區') > -1
                            ? district.indexOf('區') + 1
                            : ''
        );
    }
    if (deliveryData.district === "") {
        deliveryData.address = address.split(deliveryData.city)[1]
    } else {
        deliveryData.address = address.split(deliveryData.district)[1];
    }
    console.log("district index :", address.indexOf("鄉") > -1 ? address.indexOf("鄉") + 1 : address.indexOf("鎮") > -1 ? address.indexOf("鎮") + 1 : address.indexOf("市") > -1 ? address.indexOf("市") + 1 : address.indexOf("區") > -1 ? address.indexOf("區") + 1 : '');
    console.log('address.indexOf( deliveryData.district):', address.indexOf(deliveryData.district));
    console.log("address:", address);
    console.log("address:", deliveryData.district);
    console.log("address[]:", address.split(deliveryData.district));

    console.log("處理完的 this.deliveryData:", deliveryData);

    return deliveryData
}



