/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type PrintResponse = import('./printresponse_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends PrintResponse, REST, JSONResponse {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
