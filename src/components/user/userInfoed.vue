<template>
    <div class="userInfoed">
        <!--头部返回栏-->
        <!--<div class="headbar">-->
            <!--<mt-header title="修改信息" style="background-color: #fff;color: #333;">-->
                <!--<div @click="routerTo" slot="left">-->
                    <!--<mt-button icon="back">返回</mt-button>-->
                <!--</div>-->
            <!--</mt-header>-->
        <!--</div>-->
        <div class="formsms">
            <mt-field label="姓名：" v-model="owner"></mt-field>
            <mt-field label="手机号：" v-model="mobile"></mt-field>
            <mt-field label="商店名称：" v-model="shopName"></mt-field>
            <mt-field label="商店地址：" v-model="shopAddr"></mt-field>
            <div v-show="hiddenPassword">
                <mt-field label="账号：" v-model="loginNo"></mt-field>
                <mt-field label="密码：" v-model="password"></mt-field>
            </div>
            <mt-button type="danger" size="large" class="submit" @click="submit">确认修改</mt-button>
        </div>
    </div>
</template>

<script>
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo);
    import { Toast } from 'mint-ui';

    export default {
        name: 'userInfoed',
        data() {
            return {
                owner: userInfo.owner,
                mobile: userInfo.mobile,
                shopName: userInfo.shopName,
                shopAddr: userInfo.shopAddr,
                loginNo: userInfo.loginNo,
                password: userInfo.password,
                hiddenPassword: false,
                userInfo: ''
            };
        },
        components: {},
        methods: {
            routerTo() {
                this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
            },
            //确认修改信息
            submit() {
                this.$http.post(this.url + 'Kitchen/shop/updateShop', {
                    shopCode: userInfo.shopCode,
                    owner: this.owner,
                    mobile: this.mobile,
                    shopName: this.shopName,
                    shopAddr: this.shopAddr,
                    loginNo: this.loginNo,
                    password: this.password
                }).then(response => {
                    console.log(response);
                    if (response.state == 1) {
                        Toast('更改成功');
                        this.newInfo();
                        this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
                        // this.$router.back(-1)
                    } else {
                        Toast(response.message);
                    }
                    ;

                }).catch(error => {
                    Toast('服务器繁忙，请稍后再试');
                });
            },
            newInfo() {
                this.$http.post(this.url + 'Kitchen/shop/getShop', {
                    page: 1,
                    pageSize: 1,
                    shopCode: userInfo.shopCode
                }).then(response => {
                    sessionStorage.setItem('userInfo', JSON.stringify(response.data.PageInfo.list[0]));
                }).catch(error => {
                    Toast('服务器繁忙，请稍后再试');
                });
            }
        },
        created() {

        },
        watch: {
            // userInfo(){
            //     this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            // }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .formsms {
        margin-top: 30px;
    }

    .getsms {
        position: absolute;
        right: 10px;
        /*top: 125px;*/
        top: 80px;
    }

    .submit {
        margin-top: 30px;
    }
</style>
