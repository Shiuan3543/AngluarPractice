import {Component, ViewChild} from '@angular/core';
import {DrawerComponent, DrawerMode, DrawerSelectEvent} from '@progress/kendo-angular-layout';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'kgi-three-rows-drawer-layout',
    styleUrls: ['./three-rows-drawer.layout.scss'],
    templateUrl: './three-rows-drawer.layout.html',
})
export class ThreeRowsDrawerLayoutComponent {
    public drawerExpanded = true;
    public selected = 'Team';
    public mode: DrawerMode = 'push'; //overlay, push
    public mini = false;

    public item: any = {};

    public itemIndex;
    public drawerItems = this.resetItems();
    // drawerItems = menu;

    @ViewChild('drawer') drawer: DrawerComponent;

    constructor(private router: Router) {
    }

    ngOnInit() {

        // Update Drawer selected state when change router path
        // this.router.events.subscribe((route: NavigationStart) => {
        //     if (route instanceof NavigationStart) {
        //         this.items = this.drawerItems().map((item) => {
        //             if (item.path && item.path === route.url) {
        //                 item.selected = true;
        //                 return item;
        //             } else {
        //                 item.selected = false;
        //                 return item;
        //             }
        //         });
        //     }
        // });

        this.setDrawerConfig();
        window.addEventListener('resize', () => {
            this.setDrawerConfig();
        });

        this.expendAllMenu();
    }

    ngOnDestroy() {
        window.removeEventListener('resize', () => {
        });
    }

    public expendAllMenu(){

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

    public toggleDrawer(drawer?: DrawerComponent): void {
        console.log('toggleDrawer');
        this.drawer.toggle();
    }

    public onSelect(ev: DrawerSelectEvent): void {
        // this.router.navigate([ev.item.path]);
        this.item = ev.item;
        const title = ev.item.title;

        console.log('onSelect:', this.item);

        if (!this.item.parent) {
            return;
        }

        const newItems = this.resetItems();

        const index = newItems.findIndex((i) => i.title === title);
        newItems[index].selected = true;

        console.log('this.item.expanded: ', this.item.expanded);
        if (!this.item.expanded) {
            newItems[index].expanded = true;
            this.addChildren(newItems, index, newItems[index].children);
            console.log('newItems[index].children: ', newItems[index].children);
        }

        this.drawerItems = newItems;
        console.log('drawerItems: ', this.drawerItems);

    }

    public addChildren(arr, index, children: Array<any>) {
        arr.splice(index + 1, 0, ...children);
    }

    public resetItems(): Array<any> {
        const arr = [];
        return arr;
    }
}
