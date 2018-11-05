<template>
	<div class="home">
		<!-- 首页 -->
		<!-- 搜索框 -->
		<!--<div class="search">-->
			<!--<mt-search v-model="value"></mt-search>-->
		<!--</div>-->
		<!-- 轮播 -->
		<mt-swipe :auto="2000" style="border-bottom: 1px solid #efefef;">
			<mt-swipe-item v-for="item in items" :key="item.id">
				<a :href="item.href">
					<img :src="item.url" class="img"/>
				</a>
			</mt-swipe-item>
		</mt-swipe>
		<div class="flex-center f16 red2" style="height: 50px;width: 100%;">
				———致力于商户的一个应用型购物网站———
		</div>
		<!-- 分类 -->
		<!--<div class="classify flex-center">-->
			<!--<div class="classify_avg flex-column">-->
				<!--<div class="classify_img">-->
					<!--<img src="../assets/classify1.jpg" alt="">-->
				<!--</div>-->
				<!--<div>盘碟碗具</div>-->
			<!--</div>-->
			<!--<div class="classify_avg flex-column">-->
				<!--<div class="classify_img">-->
					<!--<img src="../assets/classify2.jpg" alt="">-->
				<!--</div>-->
				<!--<div>刀叉勺筷</div>-->
			<!--</div>-->
			<!--<div class="classify_avg flex-column">-->
				<!--<div class="classify_img">-->
					<!--<img src="../assets/classify3.jpg" alt="">-->
				<!--</div>-->
				<!--<div>玻璃饮具</div>-->
			<!--</div>-->
			<!--<div class="classify_avg flex-column">-->
				<!--<div class="classify_img">-->
					<!--<img src="../assets/classify4.jpg" alt="">-->
				<!--</div>-->
				<!--<div>锅具专场</div>-->
			<!--</div>-->
		<!--</div>-->
		<!-- 商品展示 -->
		<div class="flex-wrap">
			<div v-for="item in goods" :key="item.goods_id" style="width: 47%;padding: 3px; border:1px solid #ccc;">
				<!--<router-link to="{path:'goodsdetail',query:{name:'goods_id',goods_id:'item.goods_id'}">-->
				<div class="home_con" @click="goodsdetail(item.goods_id)">
					<div >
						<div class="home_pic">
							<img :src="imggerUrl + item.img" alt="">
						</div>
						<div class="home-msg" style="padding: 5px;">
							<div class="home_detail" style="margin-top: 3px">
								<div class=" home_name flex-between">
									<div class="f16">{{item.goods_name}}</div>
									<div class="f14">已售{{item.sale_count}}</div>
								</div>
								<!--<div class="f14 home_xq ">{{item.specification}}</div>-->

								<!--<div class="f15 home_xq">{{item.description}}</div>-->
							</div>
							<div class="flex-between" style="margin-top: 5px">
								<div>
									{{item.specification}}
								</div>
								<div class="f22 red3">
									￥{{item.price}}
								</div>
								<!--<div class="home_price flex-end f22 red3">-->
									<!--￥{{item.price}}-->
								<!--</div>-->
							</div>
						</div>
					</div>
				</div>
				<!--</router-link>-->
			</div>
			<div style="width: 47%;padding: 3px;">

			</div>
		</div>



	</div>
</template>

<script>
    import { Toast } from 'mint-ui';
export default {
	name: 'Home',
	data() {
		return {
			value:'',
            goods:[],
			items: [
                {
                    // href: 'http://baidu.com',
                    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1938362871,4056887193&fm=26&gp=0.jpg'
                },
                {
                    // href: 'http://baidu.com',
					url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4228002847,45190248&fm=26&gp=0.jpg'
                },
                {
                    // href: 'http://baidu.com',
                    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538220262585&di=cec374837186282b06c5d113df5f49aa&imgtype=0&src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F171113%2F3-1G113150919.jpg'
                },
			]
            };
        },
        components:{

        },
		methods:{
            goodsdetail:function(goods_id){
				this.$router.push({
					path:'/goodsdetail',
                    name:'goodsdetail',
                    query:{
                        goods_id:goods_id
					},
				})
            },
            // 获取列表方法
            getList(){
                let userInfo =JSON.parse( sessionStorage.getItem("userInfo"))
                //列表加载
                this.$http.post(this.url + "Kitchen/goods/findShopGoods", {
                    shopCode:userInfo.shopCode
                }).then(
                    resp => {
						if(resp.state==1){
                            // console.log(resp)
                            console.log(resp.data)
							console.log(333)
                            this.goods =resp.data;
						}
						else{
                            Toast(resp.message);
						}
                    },
                    response => {
                        Toast('服务器繁忙，请稍后再试');
                    }
                );
            }
		},
		created(){
            // 获取列表方法调用
            this.getList();
		}
    };
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    .home{
    	padding-bottom: 100px;
    }
    /*搜索框*/
    .search{
    	width: 100%;
    	height: 50px;
    	background-color: pink;
    }
    /*轮播*/
    img {
    	width: 100%;
    }
    .mint-swipe {
    	height: 218px;
    }
    .desc {
    	font-weight: 600;
    	opacity: .9;
    	padding: 5px;
    	height: 20px;
    	line-height: 20px;
    	width: 100%;
    	color: #fff;
    	background-color: gray;
    	position: absolute;
    	bottom: 0;
    }
    /*轮播结束*/
	/*shangpin*/
	.home_con{
		display: inline-block;
		/*width: 40%;*/
	}
    /*分类*/
    .classify{
    	width: 100%;
    	height: 100px;
    	background-color: #fff;
    }
    .classify_avg{
    	width: 25%;
    	color: #333;
    }
    .classify_img{
    	width: 60px;
    	height: 60px;
    	border-radius: 50%;
    	overflow: hidden;
    }
    .classify_img img{
    	width: 100%;
    	height: 100%;
    }
    /*分类结束*/
    /*.home_con{*/
    	/*width: 100%;*/
    	/*!*height: 270px;*!*/
    /*}*/
    .home_pic{
    	width: 100%;
    	height: 150px;
    	overflow: hidden;
    }
    .home_pic img{
    	width: 100%;
    	height: 100%;
    }
	/*.home-msg{*/
		/*box-sizing: border-box;*/
		/*width: 100%;*/
		/*background-color: #fff;*/
		/*padding: 10px;*/
		/*border-bottom: 1px solid #f0f0f0;*/
		/*!*height: 70px;*!*/

	/*}*/
    /*.home_detail{*/
    	/*width: 80%;*/
		/*!*height: 70px;*!*/
    /*}*/
    /*.home_name{*/
    	/*color: #333;*/
    /*}*/
    /*.home_xq{*/
    	/*color: #999;*/
		/*margin-top: 8px;*/
    /*}*/
	/*.home_price{*/
		/*width: 20%;*/
		/*!*height: 70px;*!*/

	/*}*/
    </style>
