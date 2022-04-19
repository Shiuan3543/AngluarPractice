import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';

@Component({
    selector: 'kgi-header-full-component',
    styleUrls: ['./header-full.component.scss'],
    templateUrl: './header-full.component.html'
})
export class HeaderFullComponent {
    @Output() public toggle = new EventEmitter();
    @Input() public selectedPage: string;

    public selectedLanguage = { locale: 'English', localeId: 'en-US' };
    public popupSettings = { width: '150' };
    public themes = [
        {
            href: 'assets/kendo-theme-default/dist/all.css',
            text: 'Default'
        },
        {
            href: 'assets/kendo-theme-bootstrap/dist/all.css',
            text: 'Bootstrap'
        },
        {
            href: 'assets/kendo-theme-material/dist/all.css',
            text: 'Material'
        }
    ];
    public selectedTheme = this.themes[0];

    constructor(@Inject(LOCALE_ID) public localeId: string, public intlService: IntlService) {
        this.localeId = this.selectedLanguage.localeId;
        this.setLocale(this.localeId);

    }

    public changeTheme(theme) {
        this.selectedTheme = theme;
        const themeEl: any = document.getElementById('theme');
        themeEl.href = theme.href;
    }

    public setLocale(locale): void {
        (this.intlService as CldrIntlService).localeId = locale;
    }

    public onButtonClick(): void {
        this.toggle.emit();
    }
}
