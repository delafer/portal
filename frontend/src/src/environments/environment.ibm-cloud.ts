// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl:  'http://10.17.2.173:4300/api/users/jwt',
  //authUrl:  'http://10.17.6.55:5555/auth/realms/Portal/protocol/openid-connect/token',
  authSecret: '236a996a-2664-4ced-8827-3c8eefd5e060',
  serverUrl: 'http://10.17.2.173:4300'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
