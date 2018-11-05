<template>
    <!--订单确认-->
    <div class="orderConfirm">
        <!--头部返回栏-->
        <!--<div class="headbar">-->
        <!--<mt-header title="确认订单" style="background-color: #fff;color: #333;">-->
        <!--&lt;!&ndash;<router-link :to="{name:'index',params:{select:2}}" slot="left">&ndash;&gt;-->

        <!--&lt;!&ndash;<mt-button icon="back">返回</mt-button>&ndash;&gt;-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
        <!--<div @click="$router.back(-1)" slot="left">-->
        <!--<mt-button icon="back">返回</mt-button>-->
        <!--</div>-->
        <!--</mt-header>-->
        <!--</div>-->
        <div class="order_little">
            <!--个人信息-->
            <div class="user_msg">
                <div class="consi_add flex-between">
                    <div class="order_img flex-center">
                        <img src="../../assets/img/ico-addr.png" alt="" style="width: 25px; height: 25px;">
                    </div>
                    <div class="order_user">
                        <div class="user_tel flex-between">
                            <span class="f15">{{userInfo.shopName}}</span>
                            <!--<span class="f15"></span>-->
                            <input type="text" v-model="tel" class="f16">
                        </div>

                        <div class="order_add f14">
                            <!--{{userInfo.shopAddr}}-->
                            <input type="text" v-model="address" style="width: 100%;" class="f14">
                        </div>
                    </div>

                </div>
                <div class="add-line">
                    <img src="../../assets/img/addr-line.png" alt="">
                </div>
                <!--<span class="tip"><span class="red f14">-->
                <!--*</span>注：如需修改信息，请前往个人中心</span>-->
            </div>
            <div class="mall_name f14">
                ***官方店铺
            </div>
            <div class="flex-column" v-for="item in goodsInfo">
                <div class="order_list flex-between">
                    <div class="goods_pic">
                        <img :src="imggerUrl + item.img" alt="">
                    </div>
                    <div class="goods_msg">
                        <div class="goods_name f15">
                            <span>{{item.goods_name}}</span>
                        </div>
                        <div class="goods_pri flex-between f14">
                            <span>￥{{item.price}}</span>
                            <span class="red">x{{item.num}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="f15 leave">
                *买家留言:
            </div>
            <div class="textar">
                <input type="textarea" placeholder="请注明配送时间" v-model="introduction" class="f16 textline ">
            </div>
            <!--<mt-field placeholder="请注明配送时间" type="textarea" rows="4" v-model="introduction"></mt-field>-->
        </div>
        <!--支付-->
        <div class="cart_total flex-between f15">
            <div class="cart_total_tot flex-start"><span class="f13">金额:</span><span
                    class="spend">{{total| money('元')}}</span>
            </div>
            <div class="cart_total_order flex-center" @click="pay">
                提交订单
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    let joinNum = null;
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    export default {
        name: 'orderConfirm',
        data() {
            return {
                introduction: '',
                userInfo: '',
                goodsInfo: '',
                // number: 1,
                total: 0,
                address: '',
                // name:'',
                tel: ''

            };
        },
        methods: {
            // routerTo() {
            //     this.$router.push({ name: 'Kitchen', params: { selected: '2' }});
            // },
            getList() {
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                this.address = userInfo.shopAddr;
                // this.name = userInfo.owner
                this.tel = userInfo.mobile;
                // let goodsInfo = JSON.parse(sessionStorage.getItem('goodsInfo'));
            },
            pay() {
                console.log(this.userInfo);
                console.log(this.goodsInfo);
                // if (this.goodsInfo.courier_id==undefined){
                //     this.goodsInfo.push(courier_id)
                //     this.goodsInfo.courier_id = this.goodsInfo.courierId;
                //     console.log(this.goodsInfo.courier_id)
                // }
                let len = this.goodsInfo.length;
                let goodsId = '';
                let num = '';
                let price = '';
                let soldPrice = '';
                let courier_id = '';
                for (let i = 0; i < len; i++) {
                    goodsId += this.goodsInfo[i].goodsID + ',';
                    num += this.goodsInfo[i].num + ',';
                    price += this.goodsInfo[i].price + ',';
                    soldPrice += this.goodsInfo[i].num * this.goodsInfo[i].price + ',';
                    courier_id += this.goodsInfo[i].courier_id + ',';
                }
                if (len == 1) {
                    console.log(999);
                    console.log(this.goodsInfo[0].courierId);
                    // this.goodsInfo[0].indexOf(courier_id);
                    if(this.goodsInfo[0].courierId!== undefined){
                        // 立即购买存在this.goodsInfo[0].courierId
                        courier_id = this.goodsInfo[0].courierId;
                        console.log(888)
                    }
                    // else{
                    //     // 购物车购买this.goodsInfo[0].courier_id
                    //     courier_id =  this.goodsInfo[0].courier_id;
                    // }

                }
                this.$http.post(this.url + 'Kitchen/order/insertOrderList', {
                    goodsId: goodsId,
                    num: num,
                    price: price,
                    soldPrice: soldPrice,
                    shopCode: this.userInfo.shopCode,
                    orderRemark: this.introduction,
                    // receiveAddr: this.userInfo.shopAddr,
                    receiveAddr: this.address,
                    // receiveMobile: this.userInfo.mobile
                    receiveMobile: this.tel,
                    courierId: courier_id
                }).then(
                    resp => {
                        if (resp.state==1){
                            console.log(resp.data);
                            this.$router.push({ path: '/paySuccess' });
                        }else {
                            Toast(resp.message);
                        }
                    },
                    response => {
                        Toast('服务器繁忙，请稍后再试');
                    }
                );
            }
        },
        mounted() {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            let goodsInfo = JSON.parse(sessionStorage.getItem('goodsInfo'));
            if (Array.isArray(goodsInfo)) {
                this.goodsInfo = goodsInfo;
            } else {
                this.goodsInfo = [goodsInfo];
            }
            let totals = 0;
            let len = this.goodsInfo.length;
            for (let i = 0; i < len; i++) {
                totals += this.goodsInfo[i].num * this.goodsInfo[i].price;
            }
            this.total = totals;
            this.userInfo = userInfo;
            // this.number = this.$route.query.joinNum;
            console.log(this.userInfo);
            console.log(this.goodsInfo);

        },
        filters: {
            // soldPrice: function(value) {
            //     return '￥' + value.toFixed(2);
            // }
        },
        created() {
            this.getList();
        }
    };
</script>

<style scoped>
    .orderConfirm {
        background-color: #fff;
        margin-bottom: 50px;
    }

    .order_little {
        width: 100%;
    }

    /*个人信息*/
    .user_msg {
        width: 100%;
        height: 100px;
    }

    .consi_add {
        width: 100%;
        height: 70px;
    }

    .order_img {
        width: 10%;
        height: 100%;
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
        width: 100%;
        height: 3px;
        margin-bottom: 20px;
    }

    .add-line img {
        width: 100%;
        height: 100%;
    }

    .tip {
        width: 100%;
        height: 20px;
        padding: 0 20px;
    }

    /*订单内容详情*/
    .mall_name {
        padding: 10px 20px;
        border-bottom: 1px solid #999;
    }

    .leave {
        padding: 10px 20px;
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

    /*支付*/
    .cart_total {
        width: 100%;
        height: 50px;
        position: fixed;
        z-index: 9999;
        bottom: 0px;
        background-color: #fff;
        color: #aaa;
    }

    .cart_total_tot {
        width: 40%;
        height: 100%;
        padding-left: 20px;

    }

    .spend {
        color: #9d3731;
        margin: 0 10px;
    }

    .cart_total_order {
        width: 30%;
        height: 100%;
        color: #fff;
        background-color: #9d3731;
    }

    /*底部支付结束*/
    /**/
    .textar {
        width: 100%;
        height: 100px;
    }

    .textline {
        padding: 20px;
        width: 80%;

    }
</style>