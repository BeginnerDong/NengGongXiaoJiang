<template>
	<view class="pub_editInfor">
		<view class="item">
			<view class="name">姓名</view>
			<view class="rr">
				<input type="text" placeholder="请输入姓名" v-model="submitData.title"/>
			</view>
		</view>
		<view class="item">
			<view class="name">手机号</view>
			<view class="rr">
				<input type="number" maxlength="11" placeholder="请输入手机号" v-model="submitData.phone"/>
			</view>
		</view>
		<view class="item">
			<view class="name">身份证号</view>
			<view class="rr">
				<input type="number" placeholder="请输入身份证号" v-model="submitData.keywords"/>
			</view>
		</view>
		<view class="item">
			<view class="name">地址</view>
			<view class="rr">
				<input type="text" placeholder="请输入地址" v-model="submitData.description "/>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit" open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				submitData:{
					title:'',
					phone:'',
					keywords:'',
					description:'',
					type:4
				}
			}
		},
		
		onLoad() {
			const self = this;
			uni.setStorageSync('canClick', true);
			//self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var phone = self.submitData.phone;
				
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('手机格式不正确', 'none')			
					} else {					
						const callback = (user, res) => {
							self.messageAdd();
						};
						self.$Utils.getAuthSetting(callback);
						
					}
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
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
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('提交成功', 'none');
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

		},
	};
</script>

 
