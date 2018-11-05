<template>
    <div class="paySuccess">
        <div class="view2 flex-column">
            <div class="cartimg">
                <img src="../../assets/img/支付成功.png" alt="">
            </div>
            <div class="nullcart flex-center f16">
                支付成功！如有问题请及时联系业务员！
            </div>
           <div class="flex-center">
               <div class="goto flex-center f16">
                   <router-link to="/orderList">
                       查看订单
                   </router-link>

               </div>
               <div class="goto flex-center f16">
                   <router-link to="/Kitchen">
                       返回首页
                   </router-link>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'paySuccess',
        data() {
            return {};
        }
    };
</script>

<style scoped>
    .cartimg {
        width: 100px;
        height: 100px;
        margin-top: 150px;
    }

    .cartimg img {
        width: 100%;
        height: 100%;
    }

    .nullcart {
        height: 80px;
        color: #999;
    }

    .goto {
        width: 80px;
        height: 40px;
        background-color: #9d3731;
        color: #fff;
        border-radius: 6px;
        margin: 0 10px;
    }

    .goto a {
        color: #fff;
    }

</style>