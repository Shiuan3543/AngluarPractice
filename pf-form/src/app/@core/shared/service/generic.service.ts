import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient) { }

  getDropDownByNames(names: Array<string>): Observable<any> {
    return this.http.post<any>('publicApi/getDropDownList', names);
  }

  getDropDataByEoppurpose(): Observable<any> {
    return this.http.get<any>('publicApi/getDropDataByEoppurpose');
  }

  // 取得分行別的縣市去掉重複
  getBranchBankInfo(): Observable<any> {
    return this.http.get<any>('publicApi/getBranchAddrCity');
  }

  // publicApi/getBranchAddrCity/{台北市}
  getBranchAddrDist(city:string):Observable<any>{
    console.log("city:",city);
    return  this.http.get<any>('publicApi/getBranchAddrCity/'+city);
  }

  getBranchName(city:string,area:string):Observable<any>{
    console.log("city:",city);

     console.log("area:",area);
    return  this.http.get<Observable<any>>('publicApi/getBranchAddrCity/'+city+"/"+area)
  }

  hasBank(): Observable<any> {
    return this.http.get<any>('publicApi/hasBank');
  }

  getDropDownList(dropDownName:string) {
    return this.http.get<any>(`publicApi/getDropDownList/${dropDownName}`);
  }

  sendEmailSupplementLater(): Observable<any> {
    return this.http.get<any>('publicApi/sendEmailSupplementLater');
  }


}
