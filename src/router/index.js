import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import login from '@/components/login';   //登录

import addressList from '@/components/user/addressList';  //我的地址
import orderList from '@/components/order/orderList';  //我的订单列表
import orderDetail from '@/components/order/orderDetail';  //我的订单详情
import userInfo from '@/components/user/userInfo';  //修改信息--验证手机
import userInfoed from '@/components/user/userInfoed';  //修改信息
import passwordChange from '@/components/user/passwordChange';  //修改密码--验证手机
import passwordChanged from '@/components/user/passwordChanged';  //修改密码
import aboutUs from '@/components/user/aboutUs';  //关于我们

import goodsdetail from '@/components/goods/goodsdetail';  //商品详情
import orderConfirm from '@/components/order/orderConfirm';  //订单确认

import paySuccess from '@/components/pay/paySuccess';  //支付成功
import payFailure from '@/components/pay/payFailure';  //支付失败

Vue.use(Router);

export default new Router({
    routes: [
        {   //登录
            path: '/',
            name: 'login',
            component: login
        },
        {   //首页
            path: '/Kitchen',
            name: 'Kitchen',
            component: index
        },


        {   //我的地址
            path: '/addressList',
            name: 'addressList',
            component: addressList
        },
        {   //我的订单列表
            path: '/orderList',
            name: 'orderList',
            component: orderList
        },
        {   //我的订单详情
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail
        },
        {   //关于我们
            path: '/aboutUs',
            name: 'aboutUs',
            component: aboutUs
        },
        {   //修改信息--验证手机
            path: '/userInfo',
            name: 'userInfo',
            component: userInfo
        },
        {   //修改信息
            path: '/userInfoed',
            name: 'userInfoed',
            component: userInfoed
        },
        {   //修改密码--验证手机
            path: '/passwordChange',
            name: 'passwordChange',
            component: passwordChange
        },
        {   //修改密码
            path: '/passwordChanged',
            name: 'passwordChanged',
            component: passwordChanged
        },
        {   //商品详情
            path: '/goodsdetail',
            name: 'goodsdetail',
            component: goodsdetail
        },
        {   //订单确认
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: orderConfirm
        },
        {
            //支付成功
            path: '/paySuccess',
            name: 'paySuccess',
            component: paySuccess
        },
        {
            //支付失败
            path: '/payFailure',
            name: 'payFailure',
            component: payFailure
        },


    ]
});
