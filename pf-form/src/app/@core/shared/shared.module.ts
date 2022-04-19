import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DialogComponent } from './component/dialog/dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { AngularCropperjsModule } from "angular-cropperjs";

import { ModalInputComponent } from './component/modal-input/modal-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTermsComponent } from './component/modal-terms/modal-terms.component';
import { GenericDialogComponent } from './base/dialog/info/generic-dialog.component';
import { ConfirmDialogComponent } from './base/dialog/confirm/confirm-dialog.component';
import { CustomDialogComponent } from './base/dialog/custom/custom-dialog.component';
import { HtmlDialogComponent } from './base/dialog/html/html-dialog.component';
import { VerificationDialogComponent } from './base/dialog/verification/verification-dialog.component';
import { ModalSelectComponent } from './component/modal-select/modal-select.component';
import { NumberOnlyDirective } from './directive/number-only.directive';
import { ProgressQueryDialogComponent } from './base/dialog/progress-query/progress-query-dialog.component';
import {PhoneMaskDirective} from './directive/phone-validation.directive';
import {TargetSelectAllDirective} from './directive/targetSelectAll.directive';
import { RouterModule } from '@angular/router';
import { EditDialogComponent } from './base/dialog/edit-dialog/edit-dialog.component';
import {CustomSimpleDialogComponent} from './base/dialog/custom-simple/custom-simple-dialog.component';
import { CommonTermsDialogComponent } from './base/dialog/common-terms/common-terms-dialog.component';
import { TimeoutComponent } from './base/dialog/timeout/timeout.component';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import {PreFilledTypePipe} from './pipes/preFilled-type.pipe';

@NgModule({
    imports: [
        DialogModule,
        ButtonsModule,
        CommonModule,
        AngularCropperjsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AutoCompleteModule,
        NgbTypeaheadModule,

    ],
    declarations: [
        // HasAnyAuthorityDirective,

        //Dialog
        GenericDialogComponent,
        ConfirmDialogComponent,
        CustomDialogComponent,
        DialogComponent, //deprecated

        CustomSimpleDialogComponent, //confirm頁

        ModalInputComponent,

        ModalTermsComponent,

        CommonTermsDialogComponent,
        HtmlDialogComponent,
        VerificationDialogComponent,
        ModalSelectComponent,
        ProgressQueryDialogComponent,

        PreFilledTypePipe,

        NumberOnlyDirective,
        PhoneMaskDirective,
        TargetSelectAllDirective,

        EditDialogComponent,
        TimeoutComponent,
    ],
    exports: [
        DialogComponent,
        PhoneMaskDirective,
        NumberOnlyDirective,
        TargetSelectAllDirective,

        PreFilledTypePipe,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}

