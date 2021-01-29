// 监控请求发送情况 fetch ajax
export default {
    init(cb) {
        // xhr 重写open send方法
        const xhr = window.XMLHttpRequest;

        const originOpen = xhr.prototype.open;
        const originSend = xhr.prototype.send;

        xhr.prototype.open = function (method, url, async, user, password) {
            this.info = { method, url, async, user, password };
            // console.log(this);

            return originOpen.apply(this, arguments);
        };
        xhr.prototype.send = function (value) {
            const start = Date.now();

            const fn = (type) => () => {
                this.info.type = type;
                this.info.requestSize = value ? value.length : 0;
                this.info.responseSize = this.responseText.length;
                this.time = Date.now() - start;

                cb(this.info);
            }

            this.addEventListener('load', fn('load'), false);
            this.addEventListener('error', fn('error'), false);
            this.addEventListener('abort', fn('abort'), false);
            this.addEventListener('timeout', fn('timeout'), false);

            return originSend.apply(this, arguments);
        };

        // fetch 也需重写相关方法
    },
};
