(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    // 监控错误信息
    // error 事件不可监控promise异常，需要用unhandledrejection事件
    // 参考 https://blog.csdn.net/weixin_42446705/article/details/112224934
    var errCatch = {
      init: function init(cb) {
        window.addEventListener('error', function (error) {
          console.log(error);
          var info = {
            fileName: error.filename,
            message: error.message,
            row: error.lineno,
            column: error.colno
          };
          var errorType = error.error.stack.match(/^(.*)(?=:\s)/)[0];
          info.errorType = errorType;
          cb(info);
        }, true);
      }
    };

    // // 监控页面性能 - 算时间差 Performance API
    errCatch.init(function (data) {
      console.log('异常监控', data);
    }); // 监控用户的行为

})));
