import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../service/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *wtHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *wtHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[wtHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

    private authorities!: string | string[];

    private readonly destroy$ = new Subject<void>();

    constructor(private accountService: AccountService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    @Input()
    set wtHasAnyAuthority(value: string|Array<string>) {
        this.authorities = value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.accountService
            .getAuthenticationState()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.updateView();
            });
    }

    private updateView(): void {
        const hasAnyAuthority = this.accountService.hasAnyAuthority(this.authorities);
        this.viewContainerRef.clear();
        if (hasAnyAuthority) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
