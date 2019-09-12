<template>
	<view>
		<view class="interct_idexLis" style="border-radius: 0;">
			<view class="child">
				<view class="flex">
					<view class="photo"><image src="../../static/images/home-interactive-img.png" mode=""></image></view>
					<view class="name">
						<view class="font13">快乐的猫</view>
						<view class="time">2019年6月28日</view>
					</view>
				</view>
				<view class="text font13">互动内容互动内容互动内容互动内容互动内容互动内容互动内容互动内容</view>
				<view class="imgbox">
					<view class="lisThree">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
					<view class="lisThree">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
					<view class="lisThree">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
				</view>
				<view class="label">
					<view class="lis">
						<image src="../../static/images/home-interactive-icon3.png" mode=""></image>
						<view>21165</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon2.png" mode=""></image>
						<view>565</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon4.png" mode=""></image>
						<view>2015</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H10"></view>
		
		<view class="interct_pllis">
			<view class="child"  v-for="(item,index) in interctPlData" :key="index">
				<view class="flexRowBetween">
					<view class="name flex">
						<image class="photo" src="../../static/images/home-interactive-img.png" mode=""></image>
						<view>快乐的猫</view>
					</view>
					<view class="date color3 font12">2019-9-10 15:37</view>
				</view>
				<view class="text">互动详情内容互动详情内容互动详情内容互动详情内容互动详情内容互动详情内容互动详情内容</view>
			</view>
		</view>
		
		<view class="openMore">展开更多 <image class="icon" src="../../static/images/workers-icon2.png"></image></view>
		
		<view class="interDtFixd flexRowBetween">
			<input type="text" value="" placeholder="说点什么" />
			<view class="sendBtn">发送</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				interctPlData:[
					{},{},{}
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
		padding-bottom: 140rpx;
	}
	.interct_idexLis .imgbox .lisThree{width: 210rpx; height: 210rpx;}
	
</style>
