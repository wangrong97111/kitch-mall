<template>
    <div class="aboutUs">
        <!--头部返回栏-->
        <!--<div class="headbar">-->
            <!--<mt-header title="常见问题" style="background-color: #fff;color: #333;">-->
                <!--<div @click="routerTo" slot="left">-->
                    <!--<mt-button icon="back">返回</mt-button>-->
                <!--</div>-->
            <!--</mt-header>-->
        <!--</div>-->
        <div class="content">
            <div class="content_list">
                <div class="block flex-start">
                    <div class="block_title f16">
                        我们的优势是什么？
                    </div>
                </div>
                <div class="f14 block_title_list">
                    <p>
                        我们是一个新型的专业于购物的下单平台，致力于客户提供简单轻松而又超值的购物体验。一键下单，省时省心。全网好价，一键轻松购买，花得少，买的好。用更少的钱享受更好的生活。
                    </p>
                    <p>
                        无需下载，无需注册。与业务员签约之后，账号密码直接登录即可，密码可自行修改。如有问题请及时联系您的业务员。
                    </p>
                </div>
            </div>
            <div class="content_list">
                <div class="block flex-start">
                    <div class="block_title f16">
                        购物流程？
                    </div>
                </div>
                <div class="f14 block_title_list">
                    <p>
                        您只需要在平台中选中您喜欢的商品，点击立即购买，提交订单，支付，等待包裹签收就OK啦。
                    </p>
                    <p>
                        如果您想多种商品一起购买，您可选中喜欢的商品添加至购物车，在购物车页面选中需要购买的商品，点击去结算，提交订单，支付，等待包裹签收就OK啦。
                    </p>
                </div>
            </div>
            <div class="content_list">
                <div class="block flex-start">
                    <div class="block_title f16">
                        修改个人资料？
                    </div>
                </div>
                <div class="f14 block_title_list">
                    <p>
                        如果您想要修改手机号、收获地址或者是您的店铺名称，请前往我的页面，点击个人资料修改即可。为了确保是是您本人修改，我们需要验证您的手机号，验证之后，个人信息您可自行修改。
                    </p>
                </div>
            </div>
            <div class="content_list">
                <div class="block flex-start">
                    <div class="block_title f16">
                        其他问题
                    </div>
                </div>
                <div class="f14 block_title_list">
                    <p>
                        如有任何问题，请及时联系您的业务员或本平台022-88888888
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'aboutUs',
        data() {
            return {};
        },
        methods: {
            routerTo() {
                this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .aboutUs {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .headbar {
        width: 100%;
        position: fixed;
        top: 0;
    }

    .content {
        /*margin-top: 40px;*/
    }
    .content_list{
        border-bottom: 1px solid #ddd;
    }

    /*title*/
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
    .block_title_list{
        color: #898989;
        padding: 10px 20px;
    }
    p{
      text-indent:2em;
    }

</style>
