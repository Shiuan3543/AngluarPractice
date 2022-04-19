import {Observable} from "rxjs";
import { ResponseVO } from "../model/responseVO";

export abstract class BaseRestful<T> {
    operationFind ='/findDataByCondition';
    operationList ='/getDataListByCondition';
    operationCreate ='/exCreate';
    operationUpdate ='/exUpdate';
    operationDelete ='/exDelete';
    operationSysOption ='/getSysOption';

    abstract getDataListByCondition(keyword?: string): Observable<Array<T>>;
    abstract findDataByCondition(condition: string): Observable<ResponseVO<T>>;
    abstract createDataRow(dataRow: T): Observable<object>;
    abstract deleteDataRow(id: string): Observable<object>;
    // abstract deleteDataRow(ids: Array<string>): Observable<object>;
    abstract updateDataRow(dataRow: T): Observable<ResponseVO<T>>;
    abstract createOrUpdateDataRow(dataRow: T): Observable<ResponseVO<T>>;
}
