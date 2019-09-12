<template>
	<view>
		
		<cNavList></cNavList>
		<c-swiper></c-swiper>
		
		<view class="ind-cont4">
			<scroll-view class="list" scroll-x>
				<view class="item" v-for="(item,index) in classLis" :key="index"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/material_classify/material_classify'}})">
					<image :src="item.iconUrl" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="proLis flexRowBetween">
			<view class="item-lis" v-for="(item,index) in produtList" :key="index" @click="webSelf.$Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
				<image class="img" src="../../static/images/home-img3.png" alt="" />
				<view class="tit avoidOverflow">名称名称名称名称名称</view>
				<view class="price">56.00</view>
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
				webSelf: this,
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				scrollTop: 100,
				currt:0,
				index: 0,
				classLis:[
					{iconUrl:"../../static/images/home-material-icon1.png",name:"定制材料"},
					{iconUrl:"../../static/images/home-material-icon2.png",name:"自营辅料"},
					{iconUrl:"../../static/images/home-material-icon3.png",name:"建材市场"}
				],
				produtList: [
					{},{},{},{},{},{},{},{}
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
