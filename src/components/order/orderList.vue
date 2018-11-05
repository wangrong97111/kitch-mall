<template>
    <!--订单列表-->
    <div class="orderList">
        <!--头部返回栏-->
        <div class="top">
            <!--<div class="headbar">-->
                <!--<mt-header title="我的订单" style="background-color: #fff;color: #333;">-->
                    <!--<div @click="routerTo" slot="left">-->
                        <!--<mt-button icon="back">返回</mt-button>-->
                    <!--</div>-->
                <!--</mt-header>-->
            <!--</div>-->
            <mt-navbar v-model="selected">
                <mt-tab-item id="">全部</mt-tab-item>
                <mt-tab-item id="noPay">未支付</mt-tab-item>
                <mt-tab-item id="alreadyPay">已支付</mt-tab-item>
                <mt-tab-item id="alreadyDelivered">已送达</mt-tab-item>
            </mt-navbar>
        </div>
        <div class="content">
            <!-- tab-container -->
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div class="flex-column" style="margin-top: 10px;">
                    <div class="address_list" v-for="(item,index) in orderlist">
                        <div class="address_detail f15" @click="orderDetail(index)">
                            <div class="order_list flex-between">
                                <div class="goods_pic">
                                    <img :src="imggerUrl + item.img" alt="">
                                </div>
                                <div class="goods_msg">
                                    <div class="goods_name f15 flex-between">
                                        <div>{{item.goodsName}}</div>
                                        <div class="f14 red">
                                            <span v-if="item.status==cancelOrder">订单已取消</span>
                                            <span v-else-if="item.status==noPay">未支付</span>
                                            <span v-else-if="item.status==alreadyPay">已支付</span>
                                            <span v-else-if="item.status==alreadyDelivered">已送达</span>
                                        </div>
                                    </div>
                                    <div class="goods_pri f14">
                                        <span>￥{{item.price}}</span>
                                        <span>x{{item.num}}</span>
                                        <!--<span>支付：{{item.soldPrice}}</span>-->
                                    </div>
                                    <div class="goods_pri flex-end">

                                    </div>
                                    <div class="goods_pri flex-between">
                                        <span class="f13">合计：￥{{item.soldPrice}}</span>
                                        <button @click.stop="orderdel(item.orderUUID)" class="delOrder">删除订单</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="flex-center" style="margin-top: 20px;" v-show="allLoaded">
                    <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import { MessageBox, Toast,Loadmore  } from 'mint-ui';
    let page = 1;
    let pageSize = 20;
    let orderStatus = 1;
    export default {
        name: 'orderList',

        data() {
            return {
                //0订单已取消
                cancelOrder:0,
                //1未支付
                noPay: 1,
                //2已支付
                alreadyPay: 2,
                //3已送达
                alreadyDelivered: 3,
                //订单列表
                orderlist: [],
                allLoaded: false,
                selected: '',
            };
        },
        methods: {
            routerTo() {
                this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
            },
            // 获取列表方法
            getList(mypage, mypageSize, status = '') {
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                let data = {
                    page: page,
                    pageSize: pageSize,
                    shopCode: userInfo.shopCode,
                    isUse1: '1',
                    isUse2: '1',
                    isUse3: '1'
                };
                if (status !== '') {
                    data.status = status;
                }
                let orderlist = this.orderlist;
                if (orderlist) {
                    orderlist = [];
                }
                //列表加载
                this.$http.post(this.url + 'Kitchen/order/getOrderList', data).then(
                    resp => {
                        this.orderlist = orderlist.concat(resp.data.PageInfo.list);
                        page = mypage + 1;
                        pageSize = mypageSize;
                        console.log(this.orderlist)
                    },
                    response => {

                    }
                );
            },
            orderdel(orderUUID) {
                let that = this;
                MessageBox.confirm('确定删除?').then(action => {
                    that.$http.post(that.url + 'Kitchen/order/deleteOrderList', {
                        isUse1: '1',
                        orderUUID: orderUUID
                    }).then(
                        resp => {
                            Toast({
                                message: '删除成功',
                                iconClass: 'icon icon-success'

                            });
                            // console.log(this.orderlist);
                            that.deleteOrder(this.orderlist, orderUUID);

                        }
                    );

                });
            },
            //点击查看详情
            orderDetail(index) {
                // console.log(index)
                sessionStorage.setItem('orderInfo', JSON.stringify(this.orderlist[index]));
                this.$router.push({ path: '/orderDetail' });
            },

            deleteOrder(orderList, orderUUID) {
                let len = orderList.length;
                if (len < 1) {
                    return;
                }
                for (let i = 0; i < len; i++) {
                    if (orderList[i].orderUUID == orderUUID) {
                        orderList.splice(i, 1);
                    }
                }
                this.orderlist = orderList;
            },
            //  滑动到底部
            loadBottom() {
                this.getList(page, pageSize, status);
                // this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            }
        },
        created() {
            // 获取列表方法调用
            this.getList(1, 20, '');
        },
        watch: {
            selected(newValue) {
                this.orderlist = [];
                page = 1;
                pageSize = 20;
                // console.log(this[newValue]);
                this.getList(1, 20, this[newValue]);
            },
        }
    };
</script>

<style scoped>
    .address_list {
        width: 100%;
        /*height: 100px;*/
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
    }
    .top{
        width: 100%;
        position: fixed;
        top: 0;
    }
    .content{
       /*margin-top: 85px;*/
        margin-top: 45px;
    }

    /*goods详情*/
    .order_list {
        width: 95%;
        /*height: 80px;*/
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
    }

    .goods_pic {
        width: 80px;
        height: 80px;
        background-color: bisque;
    }

    .goods_pic img {
        width: 100%;
        height: 100%;
    }

    .goods_msg {
        width: 70%;
        height: 100%;
    }

    .goods_name {
        width: 100%;
        height: 40px;
    }
    /*删除按钮*/
    .delOrder{
        width: 80px;
        height: 25px;
        background-color: #fff;
        border: 1px solid #999;
        border-radius: 50px;
    }
    .delOrder:hover{
        /*background-color: #9d3731;*/
    }

</style>