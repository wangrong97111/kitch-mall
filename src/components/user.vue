<template>
    <div class="user">
        <!-- 头像与昵称 -->
        <div class="user_top">
            <img src="../assets/backgr.jpg" alt="" class="backimg">
            <div class="user_top_con flex-start">
                <div class="user_img">
                     <img src="../assets/pic.jpg" alt="">
                </div>
                <div>
                    <div class="user_name f20">{{userInfo.shopName}}</div>
                    <div class="user_name f16">{{userInfo.mobile}}</div>
                </div>
            </div>
        </div>
        <!-- 基本信息 -->
        <div class="user_info">
            <!--<mt-cell title="我的店铺">-->
                <!--<span>{{userInfo.shopName}}</span>-->
                <!--<img slot="icon" src="../assets/img/用户.png" width="24" height="24">-->
            <!--</mt-cell>-->
            <mt-cell title="个人信息" to="userinfo" is-link>
                <span>点击修改</span>
                <img slot="icon" src="../assets/img/用户.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="我的地址" to="addressList" is-link>
                <!--<span>{{userInfo.shopAddr}}</span>-->
                <img slot="icon" src="../assets/img/地址.png" width="24" height="24">
            </mt-cell>

            <mt-cell title="我的订单" to="orderList" is-link>
                <img slot="icon" src="../assets/img/订单.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="修改密码" to="passwordChange" is-link>
                <span>点击修改</span>
                <img slot="icon" src="../assets/img/用户.png" width="24" height="24">
            </mt-cell>
        </div>
        <div class="user_info">
            <!--<mt-cell title="常见问题" to="" is-link>-->
            <!--<img slot="icon" src="../assets/img/问题.png" width="24" height="24">-->
            <!--</mt-cell>-->

            <mt-cell title="联系业务员">
                <!--<span>{{salesmanName}}</span>-->
                <span>{{salesmanMobile}}</span>
                <!--<a href="tel:salesmanMobile">{{salesmanMobile}}</a>-->
                <img slot="icon" src="../assets/img/客服.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="常见问题" to="aboutUs" is-link>
                <img slot="icon" src="../assets/img/问题.png" width="24" height="24">
            </mt-cell>
        </div>
        <mt-button type="danger" size="large" @click="logout">退出登录</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: 'User',
        data() {
            return {
                userInfo: '',
                salesmanMobile:'',
                salesmanName:''
            };
        },
        methods: {
            // 获取列表方法
            getList() {
                this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                console.log(this.userInfo);
                //列表加载
                this.$http.post(this.url + 'Kitchen/shop/getShop', {
                    page: '1',
                    pageSize: '1',
                    shopCode: this.userInfo.shopCode
                }).then(
                    resp => {
                        console.log(resp);
                        if (resp.state==1){
                            this.salesmanMobile = resp.data.PageInfo.list[0].salesmanMobile;
                            this.salesmanName= resp.data.PageInfo.list[0].salesmanName;
                        }else{
                            Toast(resp.message);
                        }
                    }).catch(error => {
                    Toast('服务器繁忙，请稍后再试');
                });
            },
            logout() {
                window.localStorage.clear();
                this.$router.push({name: 'login'})
            }
        },
        mounted() {

        },
        created() {

            // 获取列表方法调用
            this.getList();
            // location.reload()
            // this.$router.go(0)

        },
        watch:{
            // userInfo(){
            //     this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            // }
            // '$route':"getList"
            '$route':["getList","clear"],


    },
        activated(){
            // this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            this.getList();
            console.log(11111)
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .user {
        width: 100%;
        height: 100%;
        padding-bottom: 100px;
    }

    /*top*/
    .user_top {
        width: 100%;
        height: 180px;
        position: relative;
        background-image: url('../assets/backgr.jpg');
    }

    .backimg {
        opacity: 0.5;
    }

    .user_top img {
        width: 100%;
        height: 100%;
    }

    .user_top_con {
        position: absolute;
        top: 0;
        width: 100%;
        height: 200px;
    }

    .user_top_con {
        color: #fff;
    }

    .user_img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 20px;
        overflow: hidden;
        background-color: #FF9999;
    }

    .user_name {
        margin-top: 8px;
    }

    /*基本信息*/
    .user_info {
        margin: 10px 0;
    }

</style>
