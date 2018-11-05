<template>
    <div class="index">
        <div class="foot">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <home></home>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <shoppingcart></shoppingcart>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <user></user>
                </mt-tab-container-item>
            </mt-tab-container>

        </div>
        <div class="bottom-bar">
            <mt-tabbar v-model="selected">
                <mt-tab-item id="1" @click.native="showWin">
                    <img slot="icon" src="../assets/img/home-off.png" v-show="isshow1">
                    <img slot="icon" src="../assets/img/home-on.png" v-show="is_show1">
                    商城
                </mt-tab-item>
                <mt-tab-item id="2" @click.native="showAll">
                    <img slot="icon" src="../assets/img/cart-off.png" v-show="isshow2">
                    <img slot="icon" src="../assets/img/cart-on.png" v-show="is_show2">
                    购物车
                </mt-tab-item>
                <mt-tab-item id="3" @click.native="showMy">
                    <img slot="icon" src="../assets/img/user-off.png" v-show="isshow3">
                    <img slot="icon" src="../assets/img/user-on.png" v-show="is_show3">
                    我的
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
    import home from './home.vue';
    import shoppingcart from './shoppingcart.vue';
    import user from './user.vue';

    export default {
        name: 'Index',
        data() {
            return {
                selected: '1',
                shopCode:'',
                isshow1:true,
                is_show1:false,
                isshow2:true,
                is_show2:false,
                isshow3:true,
                is_show3:false,

            };
        },
        components: {
            home,
            shoppingcart,
            user
        },
        methods: {
            // getParams(){
                // this.shopCode = this.router.query.shopCode
                // console.log(this.router)
            // }
            showWin(){

            },
            showAll(){

            },
            showMy(){

            }
        },

        created() {
            // this.getParams()
            // 获取列表方法调用
            let selected = this.$route.query.selected;
            if (selected) {
                this.selected = selected;
            } else {
                this.selected = '1';
            }
        },
        watch:{
            // '$route': 'getParams'
            '$route'(to, from) {
                this.$router.go(0);
            }

        },
        // mounted(){
        //     this.shopCode = sessionStorage.getItem("shopCode")
        //     console.log(sessionStorage.getItem("shopCode"))
        // }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*.index{
      position: fixed;
      bottom: 0;

    }*/
    .index {
        /*position: relative;*/
    }

    .bottom-bar {
        width: 100%;
        position: fixed;
        bottom: 0;
    }
</style>
