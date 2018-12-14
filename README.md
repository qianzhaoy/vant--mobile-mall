# 移动商城

> 使用有赞移动端 Vue 组件库 — [Vant](https://www.youzanyun.com/zanui/vant#/zh-CN/component/intro)

> 本项目可能使用的某些 API 过于老旧, 切勿盲目使用。请以 vant 官网文档为主。

## 预览Gif图(gif加载较慢，请稍后。。。)

![gif](https://github.com/qianzhaoy/qianzhaoy.github.io/blob/master/per-view/1.gif) </br></br>
![gif](https://github.com/qianzhaoy/qianzhaoy.github.io/blob/master/per-view/2.gif) </br></br>
![gif](https://github.com/qianzhaoy/qianzhaoy.github.io/blob/master/per-view/3.gif) </br></br>

## Vue相关库与插件

- Vue + Vue-router + Vant + Sass
- axios
- vee-validate
- fastclick
- babel-polyfill
- @xkeshi/vue-countdown

> 未使用Vuex, 因为各个页面有较高的独立性. 可以省下Vuex, 少部分组件通信使用 event bus 即可.


> 店铺信息: sessionStorage
>
> 用户信息及token:  localStorage

## mock数据


``` bash
#先全局安装 json-server, 如果已经装过可忽略这步
npm install -g json-server

npm run mock
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build -- --report
```
