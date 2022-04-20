import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {COMPONENT_AIO} from './@core/shared/routing/aio.path';
import {IdentityComponent} from './identity/identity.component';
import {MainComponent} from './main/main.component';
import {InterBank1Component} from './inter-bank/inter-bank-1.component';
import {InterBank2Component} from './inter-bank/inter-bank-2.component';
import {WithdrawSettingComponent} from './cash-withdraw/withdraw-setting.component';
import {DepositSettingComponent} from './cash-deposit/deposit-setting.component';
import {DepositConfirmComponent} from './cash-deposit/deposit-confirm.component';
import {DepositCounterTraderComponent} from './cash-deposit/deposit-counter-trader.component';
import {FinishComponent} from './finish/finish.component';
import {WithdrawConfirmComponent} from './cash-withdraw/withdraw-confirm.component';
import {IntraBankConfirmComponent} from './intra-bank/intra-bank-confirm.component';
import {IntraBankSettingComponent} from './intra-bank/intra-bank-setting.component';
import {InterBank2ConfirmComponent} from './inter-bank/inter-bank-2-confirm.component';
import {UserComponent} from './user/user.component';
import {ShorturlComponent} from './shorturl/shorturl.component';
import {ViolationComponent} from './violation/violation.component';
import {ShareComponent} from './share/share.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: COMPONENT_AIO.START, // entry, pff, demo
        pathMatch: 'full'
    },
    {
        path: COMPONENT_AIO.START,  // identity
        component: IdentityComponent
    },
    {
        path: COMPONENT_AIO.MAIN,  // main
        component: MainComponent
    },
    {
        path: COMPONENT_AIO.CASH_DEPOSIT_SETTING,  // 存款
        component: DepositSettingComponent
    },
    {
        path: COMPONENT_AIO.CASH_DEPOSIT_COUNTER_TRADER,  // 臨櫃交易人
        component: DepositCounterTraderComponent
    },
    {
        path: COMPONENT_AIO.CASH_DEPOSIT_CONFIRM,  // 存款 confirm
        component: DepositConfirmComponent
    },
    {
        path: COMPONENT_AIO.CASH_WITHDRAW_SETTING,  // 提款
        component: WithdrawSettingComponent
    },
    {
        path: COMPONENT_AIO.CASH_WITHDRAW_CONFIRM,  // 提款 confirm
        component: WithdrawConfirmComponent
    },
    {
        path: COMPONENT_AIO.INTRA_BANK_SETTING,  // 本行轉帳
        // component: IntraBankComponent
        component: IntraBankSettingComponent
    },
    {
        path: COMPONENT_AIO.INTRA_BANK_CONFIRM,  // 本行轉帳 confirm
        component: IntraBankConfirmComponent
    },
    {
        path: COMPONENT_AIO.INTER_BANK_SETTING,  // 他行匯款
        component: InterBank1Component
    },
    {
        path: COMPONENT_AIO.INTER_BANK_2,  // 他行匯款
        component: InterBank2Component
    },
    {
        path: COMPONENT_AIO.INTER_BANK_CONFIRM,  // 他行匯款 confirm
        component: InterBank2ConfirmComponent
    },
    {
        path: COMPONENT_AIO.FINISH,  // 最後完成頁面
        component: FinishComponent
    },
    {
        path: COMPONENT_AIO.USER,  // 使用者資訊
        component: UserComponent
    },
    {
        path: COMPONENT_AIO.SHORTURL,  // 短網址產生
        component: ShorturlComponent
    },
    {
        path: COMPONENT_AIO.SHAREURL,  // QrCode
        component: ShareComponent
    },
    {
        path: COMPONENT_AIO.VIOLATION,  // 違規數名單
        component: ViolationComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
