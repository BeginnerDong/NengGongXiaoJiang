<template>
	<view>
		<view style="background: #fff;padding-bottom: 30rpx;">
			<cNavList></cNavList>
			<c-swiper></c-swiper>
		</view>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/addStudent/addStudent'}})">
			<view class="icon">
				<image src="../../static/images/home-interactive-icon1.png" mode=""></image>
			</view>
			<view class="tit">成为学员</view>
		</view>
		
		<view class="college_idexLis pdlr4 flexRowBetween">
			<view class="child"  v-for="(item,index) in collegeDate" :key="index"  @click=" Router.navigateTo({route:{path:'/pages/collegeDetail/collegeDetail'}})">
				<image class="pic" src="../../static/images/home-college-img.png" mode=""></image>
				<view class="tit avoidOverflow">标题标题标题标题标题标题标题标题</view>
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
				collegeDate:[
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
	

</style>
