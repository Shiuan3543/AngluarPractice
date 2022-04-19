export class ResponseVO<T> {
    rtnCode: string;
    rtnMessage: string;
    index?: number;
    rtnObj: T;

    constructor() { }
}

//FIXME from D3, should figure out the usage and removed in the future
export class WebResult {
    status: number;
    message: string;
    result: any;
    constructor(status: number, message: string, result: any) {
        this.status = status;
        this.message = message;
        this.result = result;
    }
}
