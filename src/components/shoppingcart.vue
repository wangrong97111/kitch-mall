<template>
    <div class="shoppingcart">

        <!-- 购物车内容+标题 -->
        <template v-if="cartList.length!==0">
            <div class="view1">
                <!--购物车列表-->
                <div class="cart_list">
                    <div class="cart_list_title flex-between" style="padding: 0 20px;">
                        <div class="cart_tit_l f16">
                            <span>kitchen商城</span>
                        </div>
                        <!--<div class="cart_tit_r">-->
                            <!--<span @click="edit" v-show="writ">编辑</span>-->
                            <!--<span @click="cancel" v-show="exit">取消</span>-->
                        <!--</div>-->
                    </div>
                    <!--购物车列表-->
                    <div class="cart_all">
                        <div v-for="(item,index) in cartList">
                            <div class="cart_list_detial flex-start f16">
                                <div class="choose flex-center">
                                    <div class='checkbox'>
                                        <input type='checkbox' :id="index"
                                               @click="select(item.cartID,item)"
                                               :checked="allSelectData.indexOf(item.cartID)!=-1"/>
                                        <label :for="index"></label>
                                    </div>
                                </div>
                                <div class="goods_pic">
                                    <img :src="imggerUrl+item.img" alt="">
                                </div>
                                <div class="goods_con">
                                    <div class="goods_tit flex-between">
                                        <span class="f16">{{item.goods_name}}</span>
                                        <span class="f13 red2" @click="handleRemove(index,item.cartID)">删除</span>
                                    </div>
                                    <div class="goods_mon flex-between">
                                        <div class="red">¥{{item.price}}</div>
                                        <div class="flex-end">
                                            <button class="changeNum" @click="handleReduce(index)" :disabled="item.num === 1">-</button>

                                            <!--<mt-field type="number" v-model="item.num" style="width: 80px;"></mt-field>-->
                                            <input type="number" min="1" v-model="item.num" style="width: 50px;text-align: center;"/>

                                            <button class="changeNum" @click="handleAdd(index)">+</button>
                                        </div>
                                    </div>
                                    <div class="littleTotal flex-end f14">
                                        <div>小计:{{item.price*item.num| money('元')}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--下单-->
                <div class="cart_total flex-between f15" v-show="pay">
                    <div class="choose flex-center">
                        <div class='checkbox'>
                            <input type='checkbox' id="checkbox3" @click="selecAll" v-model="allChecked">
                            <label for='checkbox3'></label>
                        </div>
                    </div>
                    <div class="cart_total_chose flex-center f13">全选</div>
                    <div class="cart_total_tot flex-end"><span class="f13">合计:</span><span
                            class="spend">{{totalPrice| money('元')}}</span>
                    </div>
                    <div class="cart_total_order flex-center" @click="payCart">
                        去结算
                    </div>
                </div>
                <!--删除-->
                <div class="cart_total flex-between f15" v-show="del">
                    <div class="choose flex-center">
                        <div class='checkbox'><input type='checkbox' @click="selecAll" v-model="allChecked">
                            <label for='checkbox3'></label>
                        </div>
                    </div>
                    <div class="cart_total_chose flex-center f13">全选</div>
                    <div class="cart_total_tot flex-end">
                    </div>
                    <div class="cart_total_order flex-center" @click="delCart">
                        删除
                    </div>
                </div>
            </div>
        </template>
        <!--购物车为空-->
        <template v-else>
            <div class="view2 flex-column">
                <div class="cartimg">
                    <img src="../assets/img/cart-off.png" alt="">
                </div>
                <div class="nullcart flex-center f15">
                    您的购物车没有商品
                </div>
                <div class="goto flex-center f16" @click="goshop">
                    去逛逛
                </div>
            </div>
        </template>

    </div>
</template>

<script>
    let data = [];
    let goodsInfo = [];
    import { Toast } from 'mint-ui';
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    export default {
        name: 'ShoppingCart',
        data() {
            return {
                cartList: '',
                pay: true,
                del: false,
                writ: true,
                exit: false,
                allChecked: false,     //全选
                allSelectData: []     //商品数据选中
            };
        },
        methods: {
            getList() {
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                this.$http.post(this.url + 'Kitchen/cart/findCarts', {
                    page: 1,
                    pageSize: 20,
                    shopCode: userInfo.shopCode
                }).then(
                    resp => {
                        console.log(resp);
                        if (resp.state == 1) {
                            this.cartList = resp.data.PageInfo.list;
                            // console.log(this.cartList.length)
                        } else {
                            Toast('服务器繁忙请稍后再试！');
                        }
                    },
                    response => {

                    });
            },
            //全选
            selecAll(event) {
                //console.log(event.currentTarget.checked);
                if (!event.currentTarget.checked) {
                    //取消全选
                    this.allSelectData = [];
                    goodsInfo = [];
                } else {
                    //全选
                    this.cartList.forEach((item, index) => {
                        this.allSelectData.push(item.cartID);
                        goodsInfo.push(item);
                    });
                }
            },
            //    选择checkbox
            select(cartID, item) {
                //知道当前点击商品对应的商品编号是否在allSelectData数组中
                console.log(this.allSelectData);
                var res = this.allSelectData.indexOf(cartID);
                res == -1 ? this.allSelectData.push(cartID) : this.allSelectData.splice(res, 1);
                this.allChecked = this.cartList.length == this.allSelectData.length;
                // console.log(this.allSelectData)
                console.log(item);
                res == -1 ? goodsInfo.push(item) : goodsInfo.splice(res, 1);
            },
            //    结算购物车
            payCart() {
                sessionStorage.setItem('goodsInfo', JSON.stringify(goodsInfo));
                console.log(this.allSelectData.length);
                if (this.allSelectData.length !== 0) {
                    this.$router.push({
                        path: '/orderConfirm',
                        name: 'orderConfirm'
                    });
                } else {
                    Toast('您还未选中商品');
                }
            },
            //减
            handleReduce(index, cartID) {
                if (this.cartList[index].num === 1) return;
                let newNum = this.cartList[index].num;
                let newCartID = this.cartList[index].cartID;

                this.$http.post(this.url + 'Kitchen/cart/updateCart', {
                    num: newNum - 1,
                    cartID: newCartID
                }).then(
                    resp => {
                        console.log(resp);
                        if (resp.state == 1) {
                            // this.cartList = resp.data.PageInfo.list;
                            this.cartList[index].num--;
                        } else {
                            // Toast('账号或密码错误');
                        }
                    },
                    response => {

                    });
            },
            //加
            handleAdd(index, cartID) {
                console.log(this.cartList);
                let newNum = this.cartList[index].num;
                let newCartID = this.cartList[index].cartID;

                this.$http.post(this.url + 'Kitchen/cart/updateCart', {
                    num: newNum + 1,
                    cartID: newCartID
                }).then(
                    resp => {
                        console.log(resp);
                        if (resp.state == 1) {
                            // this.cartList = resp.data.PageInfo.list;
                            this.cartList[index].num++;
                        } else {
                            // Toast('账号或密码错误');
                        }
                    },
                    response => {

                    });
            },
            //   删除
            handleRemove(index,cartID) {
                this.$http.post(this.url + 'Kitchen/cart/deleteCart', {
                    cartID: cartID
                }).then(
                    resp => {
                        console.log(resp);
                        if (resp.state == 1) {
                            this.cartList.splice(index, 1);
                            Toast('删除成功');
                        } else {
                            Toast('删除失败');
                        }
                    },
                    response => {

                    });
            },
            //   删除购物车
            delCart() {
                console.log(this.allSelectData.length);
                console.log(this.allSelectData);
                // let len = this.cartList[index].cartID.length;
                // for(let i=0;i<len;i++){
                //     this.$http.post(this.url + 'Kitchen/cart/deleteCart', {
                //         cartID: cartID
                //     }).then(
                //         resp => {
                //             console.log(resp);
                //             if (resp.state == 1) {
                //                 this.cartList.splice(index, 1);
                //                 Toast('删除成功');
                //             } else {
                //                 Toast('删除失败');
                //             }
                //         },
                //
                //         response => {
                //
                //         });

                // }
            },
            //    购物车空，返回商城
            goshop() {
                this.$router.push({ path: '/Kitchen', name: 'Kitchen', query: { selected: '1' } });
            },
            //编辑
            edit() {
                this.pay = false;
                this.del = true;
                this.writ = false;
                this.exit = true;
            },
            //取消
            cancel() {
                this.pay = true;
                this.del = false;
                this.writ = true;
                this.exit = false;
            }
        },
        //计算
        computed: {
            totalPrice() {
                var total = 0;
                this.cartList.forEach((item, index) => {
                    var res = this.allSelectData.indexOf(item.cartID);
                    //计算总价只计算在allSelectData商品
                    if (res != -1) {
                        total += item.num * item.price;
                    }
                });
                return total;
            }
        },
        created() {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            this.getList();
            goodsInfo = [];
        },
        filters: {
            formatPrice(val) {
                return isNaN(val) ? 0 : val;
            }
        },
        watch: {
            //购物车为空跳转商城
            '$route'(to, from) {
                this.$router.go(0);
            },


        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .shoppingcart {
        width: 100%;
        /*height: 100%;*/
        padding-bottom: 100px;
    }

    .cart_title {
        height: 40px;
        color: #999;
        padding: 0 20px;
    }

    /*购物车列表*/

    .choose {
        width: 10%;
        height: 100%;
    }

    .cart_list_title {
        box-sizing: border-box;
        height: 40px;
        border-bottom: 1px solid #f0f0f0;
        position: fixed;
        top: 0;
        background: #fff;
    }

    .cart_tit_r {
        color: #9d3731;
    }

    .cart_all {
        padding: 41px 0px;
    }

    .cart_list_detial {
        border-bottom: 1px solid #f0f0f0;
        padding: 7px 0px;
        background-color: #fff;

    }

    .goods_pic {
        width: 100px;
        height: 100px;
    }

    .goods_pic img {
        width: 100%;
        height: 100%;
    }

    .goods_con {
        width: 55%;
        /*height: 80px;*/
        padding-left: 15px;
    }

    .goods_tit {
        /*height: 50px;*/
    }

    .goods_mon {
        /*height: 30px;*/
        margin-top: 20px;
    }
    .littleTotal{
        margin-top: 10px;
    }
    .changeNum{
        background: #fff;
        border: 1px solid #ddd;
        color: #333;
    }

    /*下单栏*/
    .cart_total {
        width: 100%;
        height: 50px;
        position: fixed;
        z-index: 9999;
        bottom: 55px;
        background-color: #fff;
        color: #aaa;
    }

    .cart_total_chose {
        width: 25%;
        height: 100%;
    }

    .cart_total_tot {
        width: 35%;
        height: 100%;
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

    /*购物车为空时*/
    .cartimg {
        width: 100px;
        height: 100px;
        margin-top: 100px;
    }

    .cartimg img {
        width: 100%;
        height: 100%;
    }

    .nullcart {
        height: 50px;
        color: #999;
    }

    .goto {
        width: 80px;
        height: 40px;
        background-color: #9d3731;
        color: #fff;
        border-radius: 6px;
    }

    .goto a {
        color: #fff;
    }

    /*checklist*/
    .checkbox {
        position: relative;
        height: 30px;
    }

    .checkbox input[type='checkbox'] {
        opacity: 0;
    }

    .checkbox label {
        position: absolute;
        left: 25px;
        top: 5px;
        height: 20px;
        line-height: 20px;
    }

    .checkbox label:before {
        content: '';
        position: absolute;
        left: -30px;
        top: 0;
        width: 20px;
        height: 20px;
        border: 1px solid #ddd;
        border-radius: 50%;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
    }

    .checkbox label:after {
        content: '';
        position: absolute;
        left: -22px;
        top: 3px;
        width: 6px;
        height: 12px;
        border: 0;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background: #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
    }

    .checkbox input[type='checkbox']:checked + label:before {
        background: #9d3731;
        border-color: #9d3731;
    }

    .checkbox input[type='checkbox']:checked + label:after {
        background: #9d3731;
    }

    /*!*checklist-end*!*/


</style>
