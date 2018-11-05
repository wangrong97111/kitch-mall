<template>
    <div class="goodsdetail">
        <!--头部返回栏-->
        <!--<div class="headbar">-->
            <!--<mt-header title="商品详情" style="background-color: #fff;color: #333;">-->
                <!--<router-link to="/Kitchen" slot="left">-->
                    <!--<mt-button icon="back"></mt-button>-->
                <!--</router-link>-->
            <!--</mt-header>-->
        <!--</div>-->
        <div>
            <!--轮播-->
            <mt-swipe :auto="2000" style="height: 210px;">
                <mt-swipe-item v-for="item in items" :key="item.id">
                    <!--<a :href="item.href">-->
                    <img :src="imggerUrl + data.img" class="img"/>
                    <!--</a>-->
                </mt-swipe-item>
            </mt-swipe>
            <!--商品名称价格-->
            <div class="details-msg f15">
                <div class="details-title">{{data.goods_name}}</div>
                <div class="details_pinfo f22 red3">￥{{data.price}}</div>
                <div class="baoyou flex-end">
                    <!--<div>包邮</div>-->
                    <div>已售{{data.sale_count}}</div>
                </div>
            </div>
            <div class="block flex-start">
                <div class="block_title f15">
                    规格数量
                </div>
            </div>
            <div class="block_con">
                {{data.specification}}
            </div>
            <div class="block flex-start">
                <div class="block_title f15">
                    商品描述
                </div>
            </div>
            <div class="block_con">
                {{data.description}}
            </div>
            <!--商品详情-->
            <div class="block flex-start">
                <div class="block_title f15">
                    商品详情
                </div>
            </div>
            <div class="block_content">
                <div class="details">{{data.detail}}</div>
                <div><img :src="imggerUrl + data.img" class="img"/></div>
            </div>
            <div class="block flex-start">
                <div class="block_title f15">
                    参考网址
                </div>
            </div>
            <div class="block_con">
                {{data.goods_url}}
            </div>
        </div>

        <!--加入购物车购买-->
        <div class="cart_total flex-between f15">
            <div class="cart_total_tot flex-center">
                <div class="leftimg" @click="backindex">
                    <img src="../../assets/img/home-off.png" alt="" style="width: 25px;height: 25px;" >
                </div>
                <div class="leftimg" @click="gocart">
                    <img src="../../assets/img/cart-on.png" alt="" style="width: 25px;height: 25px;" >
                    <mt-badge type="error" size="small">{{carNum}}</mt-badge>
                </div>
            </div>
            <div class="cart_total_order flex-center" @click="addshopcar">加入购物车</div>
            <div class="cart_total_order flex-center" @click="buynow">立即购买</div>
        </div>
        <div>
            <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" style="width: 100%;">
                <joinNum :shop="shop" @changeNum="changeNum" :goodsId="goodsId"></joinNum>
            </mt-popup>
        </div>

    </div>
</template>

<script>
    import joinNum from '../activity/joinNum.vue';
    import { Toast } from 'mint-ui';

    export default {
        name: 'goodsdetail',
        data() {
            return {
                carNum: '0',
                data: '',
                introduction: '',
                goodsId: '',
                popupVisible: false,
                shop: '',
                items: [
                    {
                        // href: 'http://baidu.com',
                    },
                    {
                        // href: 'http://baidu.com',
                    }
                ]
            };
        },
        components: {
            joinNum
        },
        created() {
            // 获取列表方法调用
            this.goodsId = this.$route.query.goods_id;
            this.getList();
        },
        methods: {
            // 获取列表方法
            getList() {
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                console.log(userInfo);
                this.$http.post(this.url + 'Kitchen/goods/findShopGoods', {
                    goodsId: this.goodsId,
                    shopCode: userInfo.shopCode

                }).then(
                    resp => {
                        console.log(resp.data);
                        this.data = resp.data[0];
                        // sessionStorage.setItem('goodsInfo', resp.data[0]);
                        console.log(this.data);
                        sessionStorage.setItem('goodsInfo', JSON.stringify(resp.data[0]));
                    },
                    response => {

                    }
                );
            },
            //立即购买
            buynow() {
                this.popupVisible = true;
                this.shop = 'buy';
                // let buy= this.shop;
                // this.num = joinNum;
            },
            //加入购物车
            addshopcar() {
                this.popupVisible = true;
                this.shop = 'add';
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            },
            //加入购物车数量
            changeNum(num) {
                this.carNum = num;
                this.popupVisible = false;
            },
        //    返回首页
            backindex(){
                this.$router.push({path:'/Kitchen'});
            },
        //    去购物车
            gocart(){
                this.$router.push({ name: 'Kitchen', query: { selected: '2' } });
            }
        },
        watch: {}
    };
</script>

<style scoped>
    .goodsdetail {
        width: 100%;
        padding-bottom: 100px;
    }

    .headbar {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 9999;
    }

    /*轮播*/
    img {
        width: 100%;
    }

    .mint-swipe {
        height: 218px;
    }

    .desc {
        font-weight: 600;
        opacity: .9;
        padding: 5px;
        height: 20px;
        line-height: 20px;
        width: 100%;
        color: #fff;
        background-color: gray;
        position: absolute;
        bottom: 0;
    }

    /*商品名称价格*/
    .details-msg {
        padding: 15px;
        background-color: #fff;
    }

    .details-title {
        width: 100%;
        color: #333;
    }

    .details_pinfo {
        padding: 10px 0;
    }

    .baoyou {
        color: #666;
    }

    /*
    规格数量选择
    商品详情
    */
    .block {
        width: 100%;
        height: 50px;
        background-color: #fff;
        border-top: 1px solid #efefef;
        margin-top: 5px;
    }

    .block_title {
        color: #000;
        height: 15px;
        line-height: 15px;
        border-left: 6px solid #f73c3c;
        padding-left: 10px;
    }

    .block_con {
        width: 100%;
        font-size: 14px;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px 15px 20px 15px;
    }

    .block_content {
        padding-bottom: 20px;
        background: #fff;
    }

    .details {
        padding: 10px 15px;
    }

    /*商品详情结束*/

    /*加入购物车立即购买*/
    .cart_total {
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0px;
        background-color: #fff;
        color: #aaa;
    }

    .cart_total_tot {
        width: 40%;
        height: 100%;
    }
    .leftimg{
        margin: 0px 10px;
    }

    .cart_total_order {
        width: 30%;
        height: 100%;
        color: #fff;
        background-color: #9d3731;
        border-left: 1px solid #fff;
    }

    /*底部加入购物车立即购买结束*/

</style>