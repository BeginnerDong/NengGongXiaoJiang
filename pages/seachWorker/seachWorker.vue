<template>
	<view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween boxShaow" v-for="(item,index) in produtList" :key="index"  @click=" Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail'}})">
				<view class="pic">
					<image src="../../static/images/home-img3.png" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view>快乐的猫</view>
					</view>
					<view class="text2 avoidOverflow">擅长风格：欧式风、简约风、北美风、田园风</view>
					<view class="flex saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				produtList: [
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
		padding-bottom: 30rpx;
	}
	.designIndex .items{ margin-top: 30rpx;border-radius: 10rpx;padding: 30rpx;box-sizing: border-box;}
	.designIndex .items .pic{width: 160rpx; height: 160rpx;}
	.designIndex .items .infor{height: 160rpx; width: 70%;}
	.designIndex .items .infor .text2{margin-top: 20rpx;}
	.priceM{margin-right: 40rpx;}
</style>
