import { Injectable } from '@angular/core';
import {
  Router,
  // NavigationStart,
  NavigationEnd,
  NavigationExtras
} from '@angular/router';
import { filter, tap, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {WebResult} from "../model/responseVO";

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService {
  public canLeave: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    // 在導頁之後 把CanLeave設定為false;
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap((event: NavigationEnd) => {
          this.canLeave = false;
        }),
        map((evnets: NavigationEnd) => {
          // 取得最下層的router
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          return {
            route: evnets,
            child: child
          };
        }),
        // 此段為 確認為新戶 且有需要斷點
        filter(
          item =>
            item.child.routeConfig.data &&
            item.child.routeConfig.data.browseLog === true
        ),
        switchMap(item => this.browseLog(item.route.url))
      )
      .subscribe();
  }

  public getRouterAddress(): string {
    const urlArray = this.router.url.split('/');
    return urlArray[urlArray.length - 1].split('?')[0];
  }

  public trunOffGuard() {
    this.canLeave = true;
  }

  public navigate(commands: any[], extras?: NavigationExtras) {
    // TODO: 此為自訂的導頁 用這個才能導頁 要看下 D3/STP為何用此
    this.trunOffGuard();
    return this.router.navigate(commands, extras);
  }

  public browseLog(url: string) {
    return this.httpClient.post<WebResult>('../api/apply/setPage', {
      pageName: url.substr(1, )
    });
  }
}
