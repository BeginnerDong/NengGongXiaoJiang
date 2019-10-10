<template>
	<view>
		<view class="prolisbox pdlr4">
			<view class="prolis">
				<view class="datt">
					<view class="left">
						<view class="color3">交易时间：{{mainData.create_time}}</view>
					</view>
					<view class="state" v-if="mainData.transport_status==0">待确认</view>
					<view class="state" v-if="mainData.transport_status==1">进行中</view>
					<view class="state" v-if="mainData.transport_status==2">已完成</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image :src="mainData.userInfo&&mainData.userInfo[0]&&mainData.userInfo[0].mainImg&&mainData.userInfo[0].mainImg[0]?mainData.userInfo[0].mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow3">{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.title:''}}</view>
						<view class="price priceM">{{mainData.price}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pdlr4">
			<view class="pjEdit">
				<view class="fon14">填写评价</view>
				<view>
					<textarea value="" placeholder="请写下您的宝贵意见" v-model="submitData.content"/>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 160rpx;">
			<button type="button" open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">确定</button>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				mainData:{},
				submitData:{
					content:'',
					relation_table:'product',
					type:1
				}
				
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			
			self.$Utils.loadAll(['getMainData'], self)		
		},

		methods: {
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);			
				const pass = self.$Utils.checkComplete(self.submitData);
			
				if (pass) {								
					const callback = (user, res) => {
						self.submitData.mainImg = [];
						self.submitData.title = user.nickName;
						self.submitData.mainImg.push(user.avatarUrl);
						self.messageAdd();
						console.log('user',user)
						console.log('res',res)
					};
					self.$Utils.getAuthSetting(callback);
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入评价内容', 'none')
				};
			},
			
			messageAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				if(!wx.getStorageSync('user_info')||!wx.getStorageSync('user_info').headImgUrl){
					postData.refreshToken = true;
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				console.log('postData',postData)
				postData.saveAfter = [
					{
						tableName: 'OrderItem',
						FuncName: 'update',
						data: {
							order_no:self.mainData.order_no,
							isremark:1
						},
						searchItem:{
							
							id:self.mainData.products[0].id
						}
					}
				];	
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('评价成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.messageAdd(postData, callback);
			},
			

			getMainData() {
				const self = this;
				const postData = {};
				
				postData.searchItem = {
					id:self.id
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.getAfter = {
					userInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						self.submitData.relation_id = self.mainData.products[0].product_id;
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 80rpx; background: #F5F5F5;}
	.pjEdit{ margin-top: 30rpx;padding: 30rpx;background: #fff; border-radius: 10rpx;}
	textarea{width: 100%; height: 300rpx;background: #F5F5F5; display: block;padding: 30rpx; box-sizing: border-box; font-size: 26rpx; margin-top:20rpx;}
</style>
