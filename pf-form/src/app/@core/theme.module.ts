import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MessageService} from "@progress/kendo-angular-l10n";
import {ButtonModule} from "@progress/kendo-angular-buttons";
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import {DrawerComponent, DrawerModule, LayoutModule} from '@progress/kendo-angular-layout';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EditorModule } from '@progress/kendo-angular-editor';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import {ChartModule, ChartsModule} from '@progress/kendo-angular-charts';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import {RouterModule} from "@angular/router";
import {ThreeRowsLayoutComponent} from "./layouts/three-rows/three-rows.layout";
import {ThreeRowsDrawerLayoutComponent} from "./layouts";
import {OneRowLayoutComponent} from "./layouts/one-row/one-row.layout";
import {TwoRowsLayoutComponent} from "./layouts/two-rows/two-rows.layout";
import {HeaderFullComponent} from './header-full/header-full.component';


const CORE_MODULES = [
    ButtonModule,
    FlexLayoutModule,
    LayoutModule,
    DrawerModule,
    DropDownsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    LabelModule,
    LayoutModule,
    SchedulerModule,
    ButtonsModule,
    EditorModule,
    FileSelectModule,
    ChartsModule,
    IntlModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    NotificationModule,
    ChartModule
];

const KENDO_SHARE_MODULES = [
    ButtonModule,
    ChartModule,
    FileSelectModule,
];

const COMPONENTS = [
    HeaderComponent,
    HeaderFullComponent,
    FooterComponent,
    OneRowLayoutComponent,
    TwoRowsLayoutComponent,
    ThreeRowsLayoutComponent,
    ThreeRowsDrawerLayoutComponent
];
const PIPES = [
];

@NgModule({
    imports: [CommonModule, ...CORE_MODULES, RouterModule],
    exports: [CommonModule, ...PIPES, ...COMPONENTS, CORE_MODULES],
    declarations: [...COMPONENTS, ...PIPES],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
/**
 * Singleton module
 */
export class ThemeModule {
    static forRoot(providers = []): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: [
                ...providers,
                // { provide: MessageService, useClass: CustomMessagesService },
                // { provide: LOCALE_ID, useValue: 'zh-TW' }
            ],
        };
    }
}

