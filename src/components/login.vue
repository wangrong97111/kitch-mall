<template>
    <div claas="login flex-center">
        <form action="" class="flex-column">
            <!--<div class="logo"></div>-->
            <div class="mallName f18">
                厨具商城
            </div>
            <div class="login_con">
                <mt-field label="用户名" placeholder="请输入用户名" v-model="loginNo"></mt-field>
                <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            </div>
            <mt-button type="danger" size="large" class='login_btn' @click.prevent="logining">登录</mt-button>
        </form>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {

        name: 'login',
        data() {
            return {
                loginNo: '',
                password: ''
            };
        },
        methods: {
            logining() {
                this.$http.post(this.url + 'Kitchen/shop/shopLogin', {
                    loginNo: this.loginNo,
                    password: this.password
                }).then(
                    resp => {
                        if (resp.state==1){
                            Toast('登录成功');
                            let shopCode = resp.data.shopCode;
                            this.$router.push({path:'/Kitchen'});
                            // console.log(resp.data);
                            // console.log(1111)
                            sessionStorage.setItem('userInfo', JSON.stringify(resp.data));
                        }else{
                            Toast('账号或密码错误');
                        }
                    },

                    response => {
                        Toast('服务器繁忙，请稍后再试');
                    }
                );
            }
        },

    }
</script>

<style scoped>
    .logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ef4f4f;
        margin: 150px 0 50px 0;
    }
    .mallName{
        margin: 180px 0 50px 0;
    }

    .login_con {
        width: 70%;
        /*height: 200px;*/
        background: #fff;
        border-radius: 10px;
        margin: 0 auto;
    }

    .login_btn {
        width: 70%;
        margin-top: 30px;
    }
</style>