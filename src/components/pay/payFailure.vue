<template>
    <div class="payFailure">
		<div class="view2 flex-column">
		        <div class="cartimg">
		        <img src="../../assets/img/cart-off.png" alt="">
		        </div>
		        <div class="nullcart flex-center f15">
		        支付失败，请重新购买！
		        </div>
		        <div class="goto flex-center f16">
		        <router-link to="">
		        返回首页
		        </router-link>
		        </div>
		        </div>
    </div>
</template>

<script>
    export default {
        name: 'payFailure',
        data() {
            return {

            };
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
    }

    .goto a {
        color: #fff;
    }

</style>