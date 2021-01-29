// // 监控页面性能 - 算时间差 Performance API
// import pref from './performance';
// const formatData = (data) => {
//     let arr = [];

//     for (let [key, value] of Object.entries(data)) {
//         arr.push(`${key}=${value}`);
//     }
//     return arr.join('&');
// };

// pref.init((data) => {
//     // 数据上报 1、ajax  2、img
//     new Image().src = '/p.gif?' + formatData(data);
//     console.log('页面加载', data);
// });

// // 监控页面静态资源的加载情况
// import resource from './resource';
// resource.init((data) => {
//     console.log('静态资源加载', data);
// });

// 监控 ajax 的发送情况
// import xhr from './xhr.js';
// xhr.init((data) => {
//     console.log('ajax监控', data);
// });

//  页面的错误捕捉
import errCatch from './errCatch.js';
errCatch.init((data) => {
    console.log('异常监控', data);
});

// 监控用户的行为
