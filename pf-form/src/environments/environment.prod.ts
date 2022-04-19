export const environment = {
  production: true,
  disableGuard: true,  //關閉 Guard guard
  useMockupRouting: false, // 是否使用 frontend mockup routing, 不走 workflow routing, 也不接後端 response data (僅測流程)
  useMockupData: false, // 是否使用 @mockup json 資料, 不使用 frontend data (測流程與model format)
  useMockupKgiApi: false, // 是否使用 mockup 凱基的API
  useMockupOtp: false,
  buildTime: '2022/02/09 10:14:10',
  gitHash: 'b2b120e8'
};
