<template>
    <!--订单确认-->
    <div class="orderConfirm">
        <!--头部返回栏-->
            <!--<mt-header title="订单详情" class="top" style=" background-color: #fff;color: #333;">-->
                <!--<div @click="routerTo" slot="left">-->
                    <!--<mt-button icon="back">返回</mt-button>-->
                <!--</div>-->
            <!--</mt-header>-->
        <div class="order_little">
            <!--个人信息-->
            <div class="user_msg">
                <div class="consi_add flex-between">
                    <div class="order_img flex-center">
                        <img src="../../assets/img/ico-addr.png" alt="" style="width: 25px; height: 25px;">
                    </div>
                    <div class="order_user">
                        <div class="user_tel flex-between">
                            <span class="f15">{{orderInfo.shopName}}</span>
                            <span class="f14">{{orderInfo.receiveMobile}}</span>
                        </div>
                        <div class="order_add f13">
                            {{orderInfo.receiveAddr}}
                        </div>
                    </div>

                </div>
                <div class="add-line">
                    <img src="../../assets/img/addr-line.png" alt="">
                </div>
                <span class="tip f13"><span class="red">*</span>注：如需修改信息，请前往个人中心</span>
            </div>
            <div class="mall_name f13 red">
                购物清单
            </div>
            <div class="flex-column">
                <div class="order_list flex-between">
                    <div class="goods_pic">
                        <img :src="imggerUrl + orderInfo.img" alt="">
                    </div>
                    <div class="goods_msg">
                        <div class="goods_name f15">
                            <span>{{orderInfo.goodsName}}</span>
                        </div>
                        <div class="goods_pri flex-between">
                            <span>￥{{orderInfo.price}}</span>
                            <span>x{{orderInfo.num}}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-end order_detail">
                    <div class="totalPrice flex-between f15">
                        <span>订单总价:</span>
                        <span class="red3">￥{{orderInfo.soldPrice}}</span>
                    </div>
                </div>
                <div class="block flex-start">
                    <div class="block_title f15">
                        订单信息
                    </div>
                </div>
                <div class="order_msg f15">
                    <div class="order_msg_list">
                        <span class="leftName">订单编号:</span>
                        {{orderInfo.orderUUID}}
                    </div>
                    <div class="order_msg_list">
                        <span class="leftName">创建时间:</span>
                        {{orderInfo.ordersCreatetime}}
                    </div>

                    <div class="order_msg_list">
                        <span class="leftName">买家备注:</span>
                        {{orderInfo.orderRemark}}
                    </div>
                    <div class="order_msg_list">
                        <span class="leftName">配送公司:</span>
                        {{orderInfo.courierName}}
                    </div>
                    <div class="order_msg_list">
                        <span class="leftName">订单状态:</span>
                        {{status}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let joinNum = null;
    export default {
        name: 'orderConfirm',
        data() {
            return {
                orderInfo: {},
                status: ''
            };
        },
        methods: {
            routerTo() {
                this.$router.push({ name: 'orderList' });
            }

        },
        created() {
            // 获取列表方法调用
        },
        mounted() {
            this.orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
            console.log(this.orderInfo.status);
            let status = this.orderInfo.status;
            if (status == 0) {
                this.status = '取消订单';
            }
            if (status == 1) {
                this.status = '未支付';
            }
            if (status == 2) {
                this.status = '已支付';
            }
            if (status == 3) {
                this.status = '已送达';
            }
        }
    };
</script>

<style scoped>
    .orderConfirm {
        /*width: 100%;*/
        padding-bottom: 50px;
        background-color: #fff;
    }
    .order_little {
        width: 100%;
    }

    /*个人信息*/
    .user_msg {
        /*width: 100%;*/
        /*height: 120px;*/
    }

    .consi_add {
        width: 100%;
        /*height: 70px;*/
    }

    .order_img {
        width: 10%;
        /*height: 100%;*/
    }

    .order_user {
        width: 85%;
        padding: 15px 10px;
    }

    .user_tel {
        margin-bottom: 5px;
    }

    .order_add {
        color: #999;
    }

    .add-line {
        /*width: 100%;*/
        height: 3px;
        margin-bottom: 20px;
    }

    .add-line img {
        width: 100%;
        height: 100%;
    }

    .tip {
        /*width: 100%;*/
        height: 20px;
        padding: 0 20px;
    }

    /*订单内容详情*/
    .mall_name {
        padding: 10px 20px 5px;
        border-bottom: 1px solid #999;
    }

    /*goods详情*/
    .order_list {
        width: 90%;
        height: 80px;
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

    .totalPrice {
        margin: 0 20px;
    }

    .order_detail {
        padding: 10px 0;
        border-bottom: 5px solid #f0f0f0;
    }

    .block {
        width: 100%;
        height: 30px;
        background-color: #fff;
        margin-top: 5px;
    }

    .block_title {
        color: #000;
        height: 15px;
        line-height: 15px;
        border-left: 3px solid #f73c3c;
        padding-left: 10px;
    }
    .leftName{
        width: 200px;
        margin-right:10px;
    }
    .order_msg{
        width: 100%;
    }
    .order_msg_list{
        width: 90%;
        margin: 0 auto;
        margin-top: 7px;
    }
</style>