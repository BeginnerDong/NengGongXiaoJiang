<template>
	<view>
		<view class="work_indLis pdlr4 flexRowBetween">
			<view class="item"  
			@click="Router.navigateTo({route:{path:'/pages/myWorkbench_addContract/myWorkbench_addContract?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon1.png" alt=""/>
				<view class="tit">发起补充合同</view>
			</view>
			<view class="item" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_dispute/myWorkbench_dispute?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon2.png" alt=""/>
				<view class="tit">退款申请</view>
			</view>
			<view class="item" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_inspect/myWorkbench_inspect?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon3.png" alt=""/>
				<view class="tit">验收申请</view>
			</view>
			<view class="item" v-if="type==0" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_addBudget/myWorkbench_addBudget?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon4.png" alt=""/>
				<view class="tit">预算申请</view>
			</view>
			<view class="item" v-if="type==1" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_addBudget/myWorkbench_addBudget?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon5.png" alt=""/>
				<view class="tit">申请追加预算</view>
			</view>
			<view class="item" v-if="(type==0||isWorker)&&!isDesign"  @click="Router.navigateTo({route:{path:'/pages/myWorkbench_daka/myWorkbench_daka?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon5.png" alt=""/>
				<view class="tit">{{type==0?'工人打卡记录':'打卡'}}</view>
			</view>
			
			
			<view class="item" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_database/myWorkbench_database?id='+id+'&type='+type}})">
				<image src="../../static/images/about-workbench-icon6.png" alt=""/>
				<view class="tit">{{isDesign?'方案文件':'资料库'}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				isWorker:false,
				type:'',
				isDesign:true
			}
		},
		onLoad(options) {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
			self.id = options.id;
			self.type=options.type;
			if(uni.getStorageSync('threeInfo')&&uni.getStorageSync('threeInfo').identity==1){
				self.isWorker = true
			}
			console.log(options)
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {};		
				postData.searchItem = {
					id:self.id,
					user_type:0
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						if(self.mainData.type==1){
							self.isDesign = false
						}
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},	
		},
		
	};
</script>

<style>
	@import "../../assets/style/user.css";
	.work_indLis{ flex-wrap: wrap; margin-top: 200rpx;}
	.work_indLis .item{ width: 33.3%; font-size: 26rpx; color: #666;padding: 40rpx 10rpx;box-sizing: border-box;text-align: center;}
	.work_indLis .item image{width: 120rpx; height: 120rpx;margin:20rpx auto; display: block;}
	

</style> 
