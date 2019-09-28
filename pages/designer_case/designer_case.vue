<template>
	<view>
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/designer_case_add/designer_case_add'}})">
			<view class="icon">
				<image src="../../static/images/certificate-icon1.png" mode=""></image>
			</view>
			<view class="tit" >添加案例</view>
		</view>
		
		<view class="caceGl_ind">
			<view class="item flexRowBetween" v-for="(item,index) in mainData">
				<view class="ll">
					<image :src="item.mainImg[0].url" mode=""></image>
				</view>
				<view class="rr">
					<view class="title avoidOverflow2">{{item.title}}</view>
					<view class="lable">
						<view class="lis">{{item.passage1}}</view>
					</view>
					<view class="flexRowBetween underbTN">
						<view class="left"><text :class="item.behavior==0?'hiden':'show'">{{item.behavior==0?'隐藏':'显示'}}</text></view>
						<view class="item_delt pdlr4">
							<view class="deltBtn" @click="deleteOne(index)">
								<image class="deltIcon" src="../../static/images/certificate-icon2.png" mode=""></image>删除
							</view>
							<view class="deltBtn" 
							@click=" Router.navigateTo({route:{path:'/pages/designer_case_add/designer_case_add?id='+item.id}})">
								<image class="deltIcon" src="../../static/images/skills-icon3.png" style="width: 28rpx; height: 27rpx;" mode=""></image>编辑
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
				<view class="colseBtn"  @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
				<view class="tit font16" style="padding-bottom: 60rpx;">确认是否删除这个技能</view>
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

		onLoad() {
			const self = this;
			
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
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {
			
			deleteOne(index) {
				const self = this;
				uni.showModal({
				    title: '提示',
				    content: '确认是否删除这个案例',
				    success: function (res) {
				        if (res.confirm) {
				            const postData = {};
				            postData.searchItem = {};
				            postData.searchItem.id = self.mainData[index].id;
				            postData.tokenFuncName = 'getThreeToken';
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
				            self.$apis.messageUpdate(postData, callback)
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
				postData.tokenFuncName = 'getThreeToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: 2,
					type:5
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
				self.$apis.messageGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 80rpx;}
	.caceGl_ind .item{padding: 30rpx;border-bottom: 10rpx solid #f5f5f5;}
	.caceGl_ind .ll{width: 200rpx;height: 200rpx;}
	.caceGl_ind .ll image{width: 100%;height: 100%; display: block;}
	.caceGl_ind .rr{width:470rpx; height: 200rpx; position: relative;}
	.caceGl_ind .rr .title{height: 72rpx; overflow: hidden; line-height: 36rpx;font-size: 26rpx;}
	.caceGl_ind .rr .underbTN{position: absolute;bottom: 0;left: 0; width: 100%;box-sizing: border-box;font-size: 26rpx;}
	.caceGl_ind .rr .underbTN .left .show{color: #008A00;}
	.caceGl_ind .rr .underbTN .left .hiden{color: #FF3B3B;}
	.caceGl_ind .rr .lable{display: flex; justify-content: flex-start;flex-wrap: wrap;margin-top: 14rpx;}
	.caceGl_ind .rr .lable .lis{padding: 0 20rpx; line-height: 40rpx;background: #f5f5f5;margin-right: 20rpx;font-size: 24rpx;border-radius: 6rpx;color: #666;}
	
	.item_delt{ display: flex;justify-content: flex-end; color: #999;}
	.deltIcon{ width: 30rpx; height: 30rpx;}
	.myNeed_ind .item{margin-top: 0;margin-bottom: 20rpx;padding-bottom: 0;}
	.zizhiline{background: #fff; margin-top: 30rpx;padding-bottom: 30rpx;border-radius: 10rpx; overflow: hidden;}
	.item_delt,.deltBtn{display: flex;justify-content: flex-end; align-items: center; font-size: 26rpx; margin-left:40rpx;}
	.deltIcon{ width:22rpx ; height: 27rpx; display: block;margin-right: 10rpx;}
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB view{width: 100rpx; line-height: 50rpx; height: 50rpx;border-radius: 30rpx;border:2rpx solid #FFCB1E;}
	.btnB view.on{background: #FFCB1E;}
	
</style>
