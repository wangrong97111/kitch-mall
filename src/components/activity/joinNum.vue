<template>
    <!--购物车立即购买数量-->
    <div class="joinNum">
        <div class="choosenum flex-between">
            <div>数量</div>
            <div class="jiajian flex-center">
                <mt-button type="default" size="small" @click="sub">-</mt-button>
                <input v-model="joinNum" style="width: 50px;text-align: center;"></input>
                <mt-button type="default" size="small" @click="sum">+</mt-button>
            </div>
        </div>
        <mt-button type="danger" size="large" class="jion" @click="commit">确定</mt-button>
    </div>
</template>

<script>
    // let goodsId = null;
    import { Toast } from 'mint-ui';
    export default {
        name: 'joinNum',
        data() {
            return {
                joinNum: 1,
            };
        },
        props:['shop','goodsId'],
        // created() {
        //     goods_id = this.$route.query.goods_id;
        // },
        methods: {
            sub() {
                this.joinNum--;
                if (this.joinNum < 1) {
                    this.joinNum = 1;
                }
                this.num = this.joinNum;
            },
            sum() {
                this.joinNum++;
                this.num = this.joinNum;
            },
            commit(){
                // console.log(this.shop)
                if(this.shop=='buy'){
                    let joinNum = this.joinNum;
                    // let goods_id =this.goods_id;
                    console.log(joinNum)
                    let goodsInfo =JSON.parse(sessionStorage.getItem("goodsInfo"));
                    goodsInfo.num = joinNum;
                    goodsInfo.goodsID = goodsInfo.goods_id;
                    console.log(goodsInfo)
                    this.$router.push({
                        path: '/orderConfirm',
                        name: 'orderConfirm',
                    });
                    sessionStorage.setItem('goodsInfo', JSON.stringify(goodsInfo));
                    // this.$emit('joinNum', this.num)
                //    添加购物车
                }if(this.shop=='add'){
                    let joinNum = this.joinNum;
                    console.log(joinNum)
                    // let goods_id =this.goods_id;
                    // console.log(goods_id)
                    this.$emit('changeNum', joinNum);
                    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                    this.$http.post(this.url + 'Kitchen/cart/addCart', {
                        goodsID: this.goodsId,
                        shopCode: userInfo.shopCode,
                        num:joinNum
                    }).then(
                        resp => {
                            // console.log(resp);
                            if (resp.state==1){
                                Toast('添加成功');
                            }else{
                                Toast('添加失败');
                            };
                        },
                        response => {

                        }
                    );


                }
            }
        },
        watch:{
            joinNum(newValue){
                if(!(/^([123456789]0{0,})+$/.test(newValue))){
                    this.joinNum = 1;
                }
            }
        }
    };
</script>

<style scoped>
    .joinNum {
        width: 100%;
        height: 120px;
        background-color: #fff;
    }

    .choosenum {
        box-sizing: border-box;
        padding: 20px;
        margin-top: 20px;
    }

    .jion {
        position: fixed;
        bottom: 10px;
    }

    .jiajian {
        width: 50%;
    }
</style>