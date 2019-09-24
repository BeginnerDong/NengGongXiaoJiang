<template>
	<view>
		
		<cNavList></cNavList>
		<c-swiper></c-swiper>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="house_idexLis pdlr4">
			<view class="item boxShaow" v-for="(item,index) in houseDate" :key="index" @click=" Router.navigateTo({route:{path:'/pages/houseShowDetail/houseShowDetail'}})">
				<view class="img">
					<image src="../../static/images/home-design-img1.png" alt=""></image>
				</view>
				<view class="infor">
					<view class="tit avoidOverflow2">名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称</view>
					<view class="adrs pr avoidOverflow">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						陕西省西安市长安区韦曲街道
					</view>
				</view>
			</view>
		</view>

		
	</view>
	
</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue";
	import cNavList from "@/components/navList/navList.vue"
	
	export default {
		components: {
			cSwiper,
			cNavList
		},
		data() {
			return {
				
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				scrollTop: 100,
				currt:0,
				index: 0,
				houseDate:[
					{},{},{},{},{},{}
				]
			}
		},
		
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			activeNav:function(index){
				const self = this;
				
			},
			bindPickerChange(e) {
				// 搜索选择分类
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.orderGet(postData, callback);
			},
		},
	};
</script>

<style>
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 60rpx;
	}
	.ind-cont4 .item{width: 33.3%;}
	

</style>
