// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  disableGuard: false,  //關閉 Guard guard
  useMockupRouting: true, // 是否使用 frontend mockup routing, 不走 workflow routing, 也不接後端 response data (僅測流程)
  useMockupData: true, // 是否使用 @mockup json 資料, 不使用 frontend data (測流程或model, workflow)
  useMockupKgiApi: true, // 是否使用 mockup 凱基的API
  useMockupOtp: true,
  buildTime: '2022/02/09 10:14:10',
  gitHash: 'b2b120e8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
