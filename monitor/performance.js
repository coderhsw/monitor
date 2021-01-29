// 页面性能监控逻辑
const processData = (p) => {
    const data = {
        prevPage: p.fetchStart - p.navigationStart, // 上个页面卸载到这个页面开始加载的时长
        redirect: p.redirectEnd - p.redirectStart, // 重定向的时长
        dns: p.domainLookupEnd - p.domainLookupStart, // dns 解析的时长
        tcp: p.connectEnd - p.connectStart, // tcp 连接的时长

        // 从请求到响应的时长
        send: p.responseEnd - p.requestStart, // 开始请求到响应结束的时长
        ttfb: p.responseStart - p.navigationStart, // 首字节接收到的时长
        domReady: p.domInteractive - p.domLoading, // dom 解析的时长
        whiteScreen: p.domLoading - p.navigationStart, // 白屏时长
        dom: p.domComplete - p.domLoading, // dom 加载时长

        // onload 执行时间
        load: p.loadEventEnd - p.loadEventStart,

        // 总时长
        total: p.loadEventEnd - p.navigationStart,
    };

    return data;
};

const load = (cb) => {
    let timer = null;
    const check = () => {
        if (performance.timing.loadEventEnd) {
            clearTimeout(timer);
            cb();
        } else {
            timer = setTimeout(check, 200);
        }
    };

    window.addEventListener('load', check, false);
};
const domReady = (cb) => {
    let timer = null;
    const check = () => {
        if (performance.timing.domInteractive) {
            clearTimeout(timer);
            cb();
        } else {
            timer = setTimeout(check, 200);
        }
    };

    window.addEventListener('DOMContentLoaded', check, false);
}

export default {
    init(cb) {
        domReady(() => {
            const prefData = performance.timing;
            const data = processData(prefData);
            data.type = 'domReady';

            cb(data);
        });
        load(() => {
            const prefData = performance.timing;
            const data = processData(prefData);
            data.type = 'load';

            cb(data);
        });
    },
};
