<template>
    <div class="passwordChanged">
        <!--头部返回栏-->
        <!--<div class="headbar">-->
            <!--<mt-header title="修改密码" style="background-color: #fff;color: #333;">-->
                <!--<div @click="routerTo" slot="left">-->
                    <!--<mt-button icon="back">返回</mt-button>-->
                <!--</div>-->
            <!--</mt-header>-->
        <!--</div>-->
        <div class="formsms">
            <mt-field label="新密码：" type="password" v-model="password1"></mt-field>
            <mt-field label="确认密码：" type="password" v-model="password"></mt-field>
            <mt-button type="danger" size="large" class="submit" @click="submit">确认修改</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: 'passwordChanged',
        data() {
            return {
                password1: '',
                password: ''
            };
        },
        components: {},
        methods: {
            routerTo() {
                this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
            },
            //确认修改密码
            submit() {
                if (this.password1 !== this.password) {
                    Toast('两次密码不一致');
                } else {
                    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                    // console.log(userInfo)
                    this.$http.post(this.url + 'Kitchen/shop/updateShopPassword', {
                        shopCode: userInfo.shopCode,
                        password: this.password
                    }).then(response => {
                        console.log(response);
                        if (response.state == 1) {
                            Toast('更改成功,请重新登录！');
                            // this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
                            this.$router.push({ name: 'login'});
                        } else {
                            Toast(response.message);
                        };
                    }).catch(error => {
                        Toast('服务器繁忙，请稍后再试');

                    });
                }
            }
        },
        created() {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .formsms {
        /*background-color: #fff;*/
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
