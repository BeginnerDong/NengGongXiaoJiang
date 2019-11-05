<template>
	<view>
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/designer_skill_add/designer_skill_add'}})">
			<view class="icon">
				<image src="../../static/images/certificate-icon1.png" mode=""></image>
			</view>
			<view class="tit">添加技能</view>
		</view>
		<view class="myNeed_ind pdlr4">
			<view class="zizhiline boxShaow" v-for="(item,index) in mainData" :key="index">
				<view class="item flexRowBetween">
					<view class="cont">
						<view class="lis flex" v-if="!isWorker">
							<image class="icon" src="../../static/images/skills-icon1.png" mode=""></image>
							<view class="name">风格</view>
							<view class="tex">{{item.passage2}}-{{item.title}}</view>
						</view>
						<view class="lis flex" v-if="isWorker">
							<image class="icon" src="../../static/images/skills-icon1.png" mode=""></image>
							<view class="name">工种</view>
							<view class="tex">{{item.passage1}}-{{item.passage2}}-{{item.title}}</view>
						</view>
						<view class="lis flex">
							<image class="icon" src="../../static/images/skills-icon2.png" mode=""></image>
							<view class="name">价格</view>
							<view class="tex">￥{{item.price}}/{{item.label[item.category_id].description}}</view>
						</view>
					</view>
					<view class="arrow">
						<image src="../../static/images/arrow-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="item_delt pdlr4">
					<view class="deltBtn" @click="deleteOne(index)">
						<image class="deltIcon" src="../../static/images/certificate-icon2.png" mode=""></image>删除
					</view>
					<view class="deltBtn" @click=" Router.navigateTo({route:{path:'/pages/designer_skill_add/designer_skill_add?id='+item.id}})">
						<image class="deltIcon" src="../../static/images/skills-icon3.png" style="width: 28rpx; height: 27rpx;" mode=""></image>编辑
					</view>
				</view>
			</view>
		</view>

		<view class="xieyiAlert" v-if="is_show">
			<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
				<view class="colseBtn" @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
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


				isWorker:false,
				mainData:[],
				is_show: false,
				num: 1,
				zizhiData: [{}, {}]
			}
		},

		onLoad() {
			const self = this;
			
			
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			
		},
		
		onShow() {
			const self = this;
			if(parseInt(uni.getStorageSync('threeInfo').identity)==1){
				self.isWorker=true
			}else if(parseInt(uni.getStorageSync('threeInfo').identity)==2){
				self.isWorker=false
			};
			self.mainData = [];
			self.$Utils.loadAll(['getMainData'], self);
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

			deltAlert() {
				const self = this;
				self.is_show = !self.is_show;
			},
			
			deleteOne(index) {
				const self = this;
				uni.showModal({
				    title: '提示',
				    content: '确认是否删除这个技能',
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
				            self.$apis.productUpdate(postData, callback)
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
					user_no:uni.getStorageSync('threeInfo').user_no
				};		
				if(self.isWorker){
					postData.searchItem.type=1
				}else{
					postData.searchItem.type=2
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
				self.$apis.productGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	@import "../../assets/style/xieyiAlert.css";
	@import "../../assets/style/myNeed_ind.css";

	page {
		background: #f5f5f5;
		padding-bottom: 80rpx;
	}

	.item_delt {
		display: flex;
		justify-content: flex-end;
		color: #999;
	}

	.deltIcon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.myNeed_ind .item {
		margin-top: 0;
		margin-bottom: 20rpx;
		padding-bottom: 0;
	}

	.zizhiline {
		background: #fff;
		margin-top: 30rpx;
		padding-bottom: 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.item_delt,
	.deltBtn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 26rpx;
		margin-left: 40rpx;
	}

	.deltIcon {
		width: 22rpx;
		height: 27rpx;
		display: block;
	}

	.btnB {
		width: 60%;
		margin: 0 auto;
	}

	.btnB view {
		width: 100rpx;
		line-height: 50rpx;
		height: 50rpx;
		border-radius: 30rpx;
		border: 2rpx solid #FFCB1E;
	}

	.btnB view.on {
		background: #FFCB1E;
	}
</style>
