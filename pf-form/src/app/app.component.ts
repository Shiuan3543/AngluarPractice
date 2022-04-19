import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DrawerComponent, DrawerMode, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { SlideDialogService } from './@core/shared/service/slide-dialog.service';
import { CustomDialogService } from './@core/shared/service/custom-dialog.service';
import { GlobalDataService } from './@core/shared/service/global.service';
import { SpinnerRef, SpinnerService } from './@core/shared/service/spinner.service';

@Component({
    selector: 'kgi-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    public selected = 'Team';
    public items: Array<any>;
    public mode: DrawerMode = 'overlay'; //overlay, push
    public mini = false;

    // 前端 timeout 使用 Start
    G_TIME_MIN_FOR_LOGOFF = 10;
    stayForTenMin = 10;
    G_LOGOFF_START_URL = "";
    timeoutId: any;
    waitTenMinAlertTimeoutId: any;
    spinner: SpinnerRef<any>;
    url: string;
    // 前端 timeout 使用 End

    @ViewChild('drawer') drawer: DrawerComponent;

    constructor(private router: Router,
                protected myDialogService: SlideDialogService,
                protected gd: GlobalDataService,
                protected spinnerService: SpinnerService,
                private customDialogService: CustomDialogService
    ) {
    }

    @HostListener('window:message', ['$event'])
    onMessage(event) {
        this.resetTime();
        // console.log(" init  on message :" + event) ;
    }


    @HostListener('window:keyup', ['$event'])
    onKeyUp(ev: KeyboardEvent) {
        this.resetTime();
    }

    @HostListener('window:click', ['$event'])
    onclick(ev: MouseEvent) {
        this.resetTime();
        // console.log(`The user click just pressed ${ev}!`);
    }

    @HostListener('window:scroll', ['$event'])
    onscroll(ev: MouseEvent) {
        this.resetTime();
        // console.log(`The user onscroll just pressed ${ev}!`);
    }

    ngOnInit() {

        // Update Drawer selected state when change router path
        this.router.events.subscribe((route: NavigationStart) => {
            if (route instanceof NavigationStart) {
                this.items = this.drawerItems().map((item) => {
                    if (item.path && item.path === route.url) {
                        item.selected = true;
                        return item;
                    } else {
                        item.selected = false;
                        return item;
                    }
                });
            }
        });

        this.setDrawerConfig();

        window.addEventListener('resize', () => {
            this.setDrawerConfig();
        });
    }

    ngOnDestroy() {
        window.removeEventListener('resize', () => {
        });
    }


    resetTime() {
    }


    /*
    * 參考 stp 程式
    *  @see apply-header.component.ts
    * */
    sessiontimeout() {
        sessionStorage.clear()
    }

    public setDrawerConfig() {
        const pageWidth = window.innerWidth;
        if (pageWidth <= 770) {
            this.mode = 'overlay';
            this.mini = false;
        } else {
            this.mode = 'push';
            this.mini = true;
        }
    }

    public drawerItems() {
        return [
            {text: 'qrcode', icon: 'k-i-qr-code-scanner', path: '/qrcode', selected: true},
            {text: 'team', icon: 'k-i-grid', path: '/', selected: false},
            {text: 'dashboard', icon: 'k-i-chart-line-markers', path: '/dashboard', selected: false},
            {text: 'planning', icon: 'k-i-calendar', path: '/planning', selected: false},
            {text: 'profile', icon: 'k-i-user', path: '/profile', selected: false},
            {separator: true},
            {text: 'info', icon: 'k-i-information', path: '/info', selected: false}
        ];
    }

    public toggleDrawer(drawer?: DrawerComponent): void {
        console.log('toggleDrawer');
        this.drawer.toggle();
    }

    public onSelect(ev: DrawerSelectEvent): void {
        this.router.navigate([ev.item.path]);
        this.selected = ev.item.text;
    }

    showSpinner() {
        if (!this.spinner) {
            this.spinner = this.spinnerService.show({message: '請稍候...'});
        }
    }

    hideSpinner() {
        this.spinner = undefined;
        this.spinnerService.hide();
    }
}
