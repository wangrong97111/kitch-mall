<template>
    <div class="passwordChange">
        <!--头部返回栏-->
        <!--<div class="headbar">-->
            <!--<mt-header title="验证手机号" style="background-color: #fff;color: #333;">-->
                <!--<div @click="routerTo" slot="left">-->
                    <!--<mt-button icon="back">返回</mt-button>-->
                <!--</div>-->
            <!--</mt-header>-->
        <!--</div>-->
        <div class="formsms">
            <mt-field label="手机号：" v-model="mobile"disabled></mt-field>
            <mt-field label="验证码：" v-model="smsCode"></mt-field>
            <mt-button type="danger" size="small" class="getsms" :disabled="codeState" :class="{'bgc': codeState}"
                       @click="getSms">{{codeNum}}
            </mt-button>

            <mt-button type="danger"size="large" class="submit" @click="verTel">确认</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: 'passwordChange',
        data() {
            return {
                mobile: '',
                smsCode: '',
                codeNum: '获取验证码',
                codeState: false
            };
        },
        components: {},
        methods: {
            checkCard(){

            },
            routerTo() {
                this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
            },
            //获取验证码
            getSms() {
                let re = /^1[345678]\d{9}$/;
                if (!re.test(this.mobile)) {
                    Toast('请填写正确手机号');
                } else {
                    this.$http.post(this.url + 'Kitchen/Login/getSms', {
                        mobile: this.mobile
                    }).then(response => {
                        console.log(response);
                        if (response.state === 1) {
                            let t = 60000;
                            this.codeState = true;
                            var _this = this;
                            var time = setInterval(function() {
                                t -= 1000;
                                _this.codeNum = t / 1000 + '秒';
                                if (t <= 0) {
                                    clearTimeout(time);
                                    _this.codeState = false;
                                    _this.codeNum = '获取验证码';
                                }
                            }, 1000);
                        } else {
                            Toast(resp.message);

                        }
                    }).catch(error => {
                        Toast('服务器繁忙，请稍后再试');

                    });
                }
            },
            //验证手机号
            verTel() {
                this.$http.post(this.url + 'Kitchen/shop/verificationSms', {
                    // shopCode
                    // password
                    mobile: this.mobile,
                    smsCode: this.smsCode
                }).then(resp => {
                    if (resp.state == 1) {
                        Toast('验证成功');
                        this.$router.push({ name: 'passwordChanged' });
                    } else {
                        Toast(resp.message);
                    }
                }).catch(error => {
                    Toast('服务器繁忙，请稍后再试');
                });
            }
        },
        created() {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            console.log(userInfo);
            this.mobile = userInfo.mobile
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
