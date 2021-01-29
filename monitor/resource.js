// 监控静态资源加载
const processData = (d) => {
    if (d.name.includes('bundle')) {
        return;
    }

    let data = {
        name: d.name,
        initiatorType: d.initiatorType,
        duration: d.duration,
    }

    return data;
}

export default {
    init(cb) {
        if (window.PerformanceObserver) {
            // 有坑，刷新时监控不了css
            const observer = new PerformanceObserver((list) => {
                const data = list.getEntries();
                 
                cb(processData(data[0]));
            });
 
            observer.observe({entryTypes: ["resource"]});
        } else {
            window.addEventListener('load', () => {
                const data = performance
                    .getEntriesByType('resource')
                    .map((item) => processData(item))
                    .filter(item => !!item);

                cb(data);
            });
        }
    },
};
