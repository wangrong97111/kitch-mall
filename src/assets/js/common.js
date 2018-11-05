import axios from 'axios';
import { post, fetch, patch, put } from './http.js';

export default {
    install(Vue, options) {
        // Vue.prototype.url= "http://wx.tianjincq.com/YunyixiaoClient/",
        // Vue.prototype.url = 'http://192.168.1.108:8080/';
        // Vue.prototype.url = 'http://192.168.1.177:8080/';
        Vue.prototype.url = 'http://39.107.70.80:8080/';
        // Vue.prototype.imggerUrl = 'http://doutui.oss-cn-beijing.aliyuncs.com/';
        Vue.prototype.imggerUrl= "http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/",

        Vue.prototype.$http = {
            post,
            fetch,
            patch,
            put
        };
    }
};