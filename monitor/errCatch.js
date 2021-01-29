// 监控错误信息
// error 事件不可监控promise异常，需要用unhandledrejection事件
// 参考 https://blog.csdn.net/weixin_42446705/article/details/112224934
export default {
    init(cb) {
        window.addEventListener('error', (error) => {
            console.log(error);
            const info = {
                fileName: error.filename,
                message: error.message,
                row: error.lineno,
                column: error.colno
            };

            const errorType = error.error.stack.match(/^(.*)(?=:\s)/)[0];
            info.errorType = errorType;

            cb(info);
        }, true);
    }
}