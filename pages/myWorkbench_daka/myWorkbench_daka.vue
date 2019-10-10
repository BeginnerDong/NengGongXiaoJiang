<template>
	<view>
		
		<view class="dakaJilu pdlr4">
			<view class="item" v-for="(item,index) in mainData">
				<view class="font15">{{item.create_time}} {{item.description}}</view>
				<view class="font13 line">
					<view class="flex timebox">
						<view class="tit">上班：</view>
						<view class="tt">{{item.on_time}}</view>
					</view>
				</view>
				<view class="font13 line">
					<view class="flex timebox">
						<view class="tit">下班：</view>
						<view class="tt">{{item.off_time=='8:0:0'?'':item.off_time}}</view>
					</view>
					<view class="pic">
						<image :src="item&&item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="fabubtn" style="top: 28%;" v-if="todayData.length==0&&type==1"   @click="processAdd()">
			<view class="icon">
				<image src="../../static/images/daka-icon1.png" mode=""></image>
			</view>
			<view class="tit">上班</view>
		</view>
		
		<view class="fabubtn"  style="top: 45%;"  v-if="todayData.length>0&&type==1&&todayData.off_time!=0"
		@click=" Router.navigateTo({route:{path:'/pages/myWorkbench_daka_goOff/myWorkbench_daka_goOff?id='+todayData[0].id}})">
			<view class="icon">
				<image src="../../static/images/daka-icon2.png" mode=""></image>
			</view>
			<view class="tit" >下班</view>
		</view>
		
		<!-- 打卡弹框 -->
		<view class="dakaAlert center" v-if="is_show">
			<view class="colseBtn"  @click="refundAlert">×</view>
			<view class="tit">打卡成功</view>
			<view class="time">{{daka_time}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				
				is_show:false,
				mainData:[],
				submitData:{
					
				},
				daka_time:'',
				week:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
				todayData:[]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			console.log('options',options)
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			
		},
		
		onShow() {
			const self = this;
			self.$Utils.loadAll(['getOrderData'], self)
		},
		
		
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		methods: {
			
			
			getTodayData() {
				const self = this;
				var dayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;
				var nowTime = Date.parse(new Date()) / 1000;
				
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					user_no:['in',[self.orderData.user_no,self.orderData.shop_no]],
					order_no:self.orderData.order_no,
					type:7,
					create_time:['between',[dayStart, nowTime]]
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.todayData.push.apply(self.todayData, res.info.data);
						
					} else {
						self.$Utils.showToast('没有更多了','none');
					};
					console.log(self.todayData)
					
				};
				self.$apis.processGet(postData, callback);
			},
			
			refundAlert(){
				const self = this;
				self.is_show = !self.is_show
			},
			
			processAdd() {
				const self = this;
				const postData = {};
				var now = Date.parse(new Date());
				var nowDate = self.$Utils.timeto(now,"ymd");
				console.log('nowDate',nowDate)
				console.log('3244',new Date(nowDate).getDay())
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
					postData.data.title = '上班打卡'
					postData.data.on_time = now;
					postData.data.description = self.week[new Date(self.$Utils.timeto(now,"ymd")).getDay()]
					postData.data.type = 7;
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						self.daka_time = self.$Utils.timeto(now,"hms");
						self.$Utils.showToast('打卡成功', 'none', 1000)
						self.getOrderData()
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.processAdd(postData, callback);
			},
			
			getMainData(isNew) {
				const self = this;
				var dayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;
				var nowTime = Date.parse(new Date()) / 1000;
				if(isNew){
					self.mainData = [];
					self.paginate={
						count: 0,
						currentPage:1,
						pagesize:5,
						is_page:true,
					};
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					user_no:['in',[self.orderData.user_no,self.orderData.shop_no]],
					order_no:self.orderData.order_no,
					type:7
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].create_time = self.mainData[i].create_time.substr(0,10)
							self.mainData[i].on_time = self.$Utils.timeto(self.mainData[i].on_time,"hms")
							self.mainData[i].off_time = self.$Utils.timeto(self.mainData[i].off_time,"hms")
						}
					} else {
						self.$Utils.showToast('没有更多了','none');
					};
					
				};
				self.$apis.processGet(postData, callback);
			},
			
			getOrderData() {
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
						self.orderData=res.info.data[0];
						self.submitData.order_no = self.orderData.order_no
					} else {
						self.$Utils.showToast(res.msg,'none');
					};				
					console.log(self.orderData)
					self.getMainData(true);
					self.getTodayData()
					
					self.$Utils.finishFunc('getOrderData');
				};
				self.$apis.orderGet(postData, callback);
			},	

		},
	};
</script>
<style>
	page{background: #F5F5F5;padding-bottom: 60rpx;}
	.dakaJilu .item{padding: 30rpx;background: #fff;border-radius: 10rpx; margin-top: 30rpx;}
	.dakaJilu .line{padding-top:26rpx; font-size: 26rpx; display: flex;}
	.dakaJilu .line .timebox{width: 300rpx; align-items: normal;}
	.dakaJilu .line .tit{width: 120rpx;}
	.dakaJilu .line .tt{width: 180rpx;}
	.dakaJilu .line .pic{width: 350rpx;}
	.dakaJilu .line .pic image{width: 150rpx; height: 150rpx;display: block;margin-right: 20rpx;}
	
	.dakaAlert{ position: fixed; top: 50%;left: 50%; transform: translate(-50%,-50%); width: 80%;padding: 80rpx 3%;background: rgba(0,0,0,0.5); color: #fff;box-sizing: border-box; z-index: 66;border-radius: 12rpx;}
	.dakaAlert .colseBtn{ border: 2rpx solid #ffff; color: #fff;background: none; left: auto; right: 20rpx; top: 20rpx; transform: initial;}
	.dakaAlert .tit{font-size: 32rpx;margin-bottom: 40rpx;}
	.dakaAlert .time{font-size: 60rpx;}
	
	
</style>

 
