<template>
	<div class="address">
		<!--头部返回栏-->
        <!--<div class="headbar">-->
            <!--<mt-header title="我的地址" style="background-color: #fff;color: #333;">-->
                <!--<div @click="routerTo" slot="left">-->
                    <!--<mt-button icon="back">返回</mt-button>-->
                <!--</div>-->
            <!--</mt-header>-->
        <!--</div>-->
        <div class="flex-column">
        	<div class="address_list">
        		<div class="address_detail f15 flex-start">
        			<div>
                        <img src="../../assets/img/iconfont-shouhuodizhi.png" alt="" class="add_img">
                    </div>
                    <div>
                        {{address}}
                    </div>
                </div>
        	</div>
        </div>
	</div>
</template>

<script>
export default {
	name: 'addressList',
	data() {
		return {
            address:''
		};
	},
    methods:{
        routerTo() {
            this.$router.push({ name: 'Kitchen', query: { selected: '3' } });
        },
    },
    created(){
        this.address = JSON.parse(sessionStorage.getItem('userInfo')).shopAddr;
    },
    watch:{

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.address_list{
        width: 100%;
		height: 60px;
		border-top: 1px solid #f0f0f0;
		border-bottom: 1px solid #f0f0f0;
	}
	.address_detail{
        box-sizing: border-box;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid #f0f0f0;
	}
	.add_img{
		width: 30px;
		height: 30px;
        margin-right: 15px;
	}
</style>
