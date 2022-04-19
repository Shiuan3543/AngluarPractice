import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DepositModel} from '../model/deposit.model';
import {WithdrawModel} from '../model/withdraw.model';
import {TraderModel} from '../model/trader.model';
import {TradeModel} from '../model/trade.model';
import {IntraBankModel} from '../model/intra-bank.model';
import {InterBankModel} from '../model/inter-bank.model';

@Injectable({
    providedIn: 'root'
})
export class GlobalDataService {
    private _currentPageType: number;
    public _currentPageTypeSubject: BehaviorSubject<number> = new BehaviorSubject(0); // 即時監聽

    private _currentStationName: string;


    longUrl:string;//長網址
    idno:string;//加上去
    phone:string;//加上去

    constructor() {
    }

    private _data: any;

    set token(token: string) {
        sessionStorage.setItem('_token',JSON.stringify(token));
    }

    get token() {
        return JSON.parse(sessionStorage.getItem('_token'));
    }

    set depositTrader(data: TraderModel) {
        // set data(data: new() => T) {
        if (data) {
            sessionStorage.setItem('_depositTrader', JSON.stringify(data));
            this._data = data;
        }
    }

    get depositTrader(): TraderModel {
        return JSON.parse(sessionStorage.getItem('_depositTrader'));
    }

    set tradeList(data: Array<TradeModel>) {
        if (data) {
            sessionStorage.setItem('_tradeList', JSON.stringify(data));
            this._data = data;
        }
    }

    //本次交易所有項目
    get tradeList(): Array<TradeModel> {
        return JSON.parse(sessionStorage.getItem('_tradeList'));
    }

    set depositList(data: Array<DepositModel>) {
        if (data) {
            sessionStorage.setItem('_depositList', JSON.stringify(data));
            this._data = data;
        }
    }

    get depositList(): Array<DepositModel> {
        return JSON.parse(sessionStorage.getItem('_depositList'));
    }

    set withdrawList(data: Array<WithdrawModel>) {
        if (data) {
            sessionStorage.setItem('_withdrawList', JSON.stringify(data));
            this._data = data;
        }
    }

    get withdrawList(): Array<WithdrawModel> {
        return JSON.parse(sessionStorage.getItem('_withdrawList'));
    }

    set intraBankList(data: Array<IntraBankModel>) {
        if (data) {
            sessionStorage.setItem('_intraBankList', JSON.stringify(data));
            this._data = data;
        }
    }

    get intraBankList(): Array<IntraBankModel> {
        return JSON.parse(sessionStorage.getItem('_intraBankList'));
    }

    set interBankList(data: InterBankModel) {
        if (data) {
            sessionStorage.setItem('_interBankList', JSON.stringify(data));
            this._data = data;
        }
    }

    get interBankList(): InterBankModel {
        return JSON.parse(sessionStorage.getItem('_interBankList'));
    }

    set data(data: any) {
        // set data(data: new() => T) {
        if (data) {
            sessionStorage.setItem('_data', JSON.stringify(data));
            this._data = data;
        }
    }

    // get data(): new() => T {
    get data(): any {
        return JSON.parse(sessionStorage.getItem('_data'));
    }

    setData(data: any) {
        if (data) {
            sessionStorage.setItem('_data', JSON.stringify(data));
            this._data = data;
        }
    }

    clearDepositList(){
        sessionStorage.removeItem('_depositList');
    }

    clearWithdrawList(){
        sessionStorage.removeItem('_withdrawList');
    }

    clearInterBankList(){
        sessionStorage.removeItem('_interBankList');
    }

    clearIntraBankList(){
        sessionStorage.removeItem('_intraBankList');
    }


    clearTrader(){
        sessionStorage.removeItem('_depositTrader');
    }

    clearData() {
        console.log('clear data in storage!!!')
        console.log('clear data in storage!!!')
        console.log('clear data in storage!!!')
        console.log('clear data in storage!!!')
        console.log('clear data in storage!!!')

        console.log('clear all data in session');
        sessionStorage.clear();
    }

}

//https://stackoverflow.com/questions/49204568/generic-object-assign
export class Factory<T> {
    constructor(private type: new () => T) { }

    getNew(): T {
        return new this.type();
    }
}
