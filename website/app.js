const Koa = require('koa');
const Server = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(Server(path.join(__dirname, 'client')));
app.use(Server(path.join(__dirname, 'dist')));
app.use(Server(path.join(__dirname, 'node_modules')));

app.use((ctx, next) => {
    if (ctx.path === '/api/list') {
        ctx.body = {name: 'hello', age: 12};
    } else {
        next();
    }
})

app.listen(3000, () => {
    console.log('server start 3000');
});