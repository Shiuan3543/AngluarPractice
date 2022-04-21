import {QRCodeModule} from 'angularx-qrcode';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ThemeModule} from './@core/theme.module';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {KgiAuthInterceptor} from './@core/shared/interceptor/kgi-auth.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlideDialogModule} from './@core/shared/service/slide-dialog.service';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CountdownModule} from 'ngx-countdown';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './@core/shared/shared.module';
import {MainComponent} from './main/main.component';
import {InterBank1Component} from './inter-bank/inter-bank-1.component';
import {InterBank2Component} from './inter-bank/inter-bank-2.component';
import {InterBank2ConfirmComponent} from './inter-bank/inter-bank-2-confirm.component';
import {WithdrawSettingComponent} from './cash-withdraw/withdraw-setting.component';
import {DepositConfirmComponent} from './cash-deposit/deposit-confirm.component';
import {DepositSettingComponent} from './cash-deposit/deposit-setting.component';
import {DepositCounterTraderComponent} from './cash-deposit/deposit-counter-trader.component';
import {IdentityComponent} from './identity/identity.component';
import {FinishComponent} from './finish/finish.component';
import {WithdrawConfirmComponent} from './cash-withdraw/withdraw-confirm.component';
import {IntraBankConfirmComponent} from './intra-bank/intra-bank-confirm.component';
import {IntraBankSettingComponent} from './intra-bank/intra-bank-setting.component';
import {UserComponent} from './user/user.component';
import {ShorturlComponent} from './shorturl/shorturl.component';
import {ViolationComponent} from './violation/violation.component';
import {ShareComponent} from './share/share.component';
import { CityPickerComponent } from './city-picker/city-picker.component';

@NgModule({
    declarations: [
        AppComponent,

        IdentityComponent,
        UserComponent, // user
        MainComponent,
        DepositSettingComponent,
        DepositConfirmComponent,
        DepositCounterTraderComponent,
        ShorturlComponent, // short
        WithdrawSettingComponent,
        WithdrawConfirmComponent,

        IntraBankSettingComponent,
        IntraBankConfirmComponent,

        InterBank1Component,
        InterBank2Component,
        InterBank2ConfirmComponent,

        FinishComponent,

        AppComponent,
        ViolationComponent,
        ShareComponent,
        CityPickerComponent,
    ],
    imports: [
        ThemeModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        CarouselModule,
        CountdownModule,
        FlexLayoutModule,
        SlideDialogModule,
        QRCodeModule,
        SharedModule,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: KgiAuthInterceptor, multi: true}, // HTTP 攔截器
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule {
}
