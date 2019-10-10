<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">历史资料</view>
		</view>
		<view class="ziliao_indLis pdlr4">
			<view class="item" v-for="(item,index) in mainData" :key="index">
				<view class="leftPic">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" mode=""></image>
				</view>
				<view class="infor">
					<view class="avoidOverflow">{{item.description}}</view>
					<view class="party font12 color3">{{item.title=='工人上传资料'?'乙方':'甲方'}}</view>
					<view class="flexRowBetween last">
						<view class="upBtn">下载</view>
						<view class="delt"  @click="deleteOne(index)">
							<image src="../../static/images/about-address-icon3.png" mode=""></image>
							删除
						</view>
					</view>
				</view>
			</view>
			<view class="submitbtn" style="margin-top: 100rpx;">
				<button type="button" 
				@click=" Router.navigateTo({route:{path:'/pages/myWorkbench_database_upmsg/myWorkbench_database_upmsg?id='+id+'&type='+type}})">上传资料</button>
			</view>
			
		</view>
		
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
				<view class="colseBtn"  @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
				<view class="tit font16" style="padding-bottom: 60rpx;">确认是否删除这些资料</view>
				<view class="btnB flexRowBetween">
					<view :class="num==1? 'on':''" @click="chage('1')">是</view>
					<view :class="num==2? 'on':''" @click="chage('2')">否</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router: this.$Router,



				mainData:[],
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			//self.$Utils.loadAll(['getMainData'], self);
		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},

		onShow() {
			const self = this;
			self.mainData = [];
			self.$Utils.loadAll(['getOrderData'], self);
		},

		methods: {
			
			deleteOne(index) {
				const self = this;
				uni.showModal({
				    title: '提示',
				    content: '确认是否删除这个资料',
				    success: function (res) {
				        if (res.confirm) {
				            const postData = {};
				            postData.searchItem = {};
				            postData.searchItem.id = self.mainData[index].id;
				            if(self.type==1){
				            	postData.tokenFuncName = 'getThreeToken';
				            	
				            }else{
				            	postData.tokenFuncName = 'getProjectToken';
				            	
				            };
				            
				            postData.data = {
				            	status:-1
				            };
				            const callback = (res) => {
				            	if (res.solely_code==100000) {
				            		self.$Utils.showToast('删除成功', 'none');
				            		setTimeout(function() {
				            			self.getMainData(true);
				            		}, 500);
				            		
				            	}else{
				            		self.$Utils.showToast(res.msg, 'none');
				            	}
				            };
				            self.$apis.processUpdate(postData, callback)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});	
				
			},

			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 5
					}
				};
				const postData = {};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';					
				}else{
					postData.tokenFuncName = 'getProjectToken';				
				};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: 2,
					type:6,
					order_no:self.orderData.order_no
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
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
						
					} else {
						self.$Utils.showToast(res.msg,'none');
					};				
					console.log(self.orderData)
					self.getMainData(true);
					
					
					self.$Utils.finishFunc('getOrderData');
				};
				self.$apis.orderGet(postData, callback);
			},	
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 60rpx;}
	.leftPic{width: 200rpx; height: 200rpx; display: block;}
	.ziliao_indLis .item{padding: 30rpx 0; display: flex; justify-content: space-between;border-bottom: 2rpx solid #E7E7E7;}
	.leftPic image{width: 100%;height: 100%;}
	.ziliao_indLis .infor{ width: 67%;}
	.last{margin-top: 80rpx;}
	.upBtn{ width: 100rpx; height: 50rpx; line-height: 50rpx; text-align: center;background: #FFCB1E; border-radius: 8rpx;}
	.delt{width: 110rpx; text-align: right;display: flex;justify-content: flex-end; color: #666;font-size: 24rpx;}
	.delt image{width: 30rpx;height: 30rpx; display: block; margin-right: 6rpx;}
	
	.deltIcon{ width:22rpx ; height: 27rpx; display: block;margin-right: 10rpx;}
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB view{width: 100rpx; line-height: 50rpx; height: 50rpx;border-radius: 30rpx;border:2rpx solid #FFCB1E;}
	.btnB view.on{background: #FFCB1E;}
</style>

 
