<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">姓名：</view>
					<view class="rr">
						<input type="text" placeholder="请输入姓名" v-model="submitData.title">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">性别：</view>
					<view class="flexRowBetween r-selt">
						<view class="selt"  @click="change('1')" style="justify-content: flex-end;">
							<image :src="submitData.keywords==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>男
						</view>
						<view class="selt"  @click="change('2')" style="justify-content: flex-end;">
							<image :src="submitData.keywords==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>女
						</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">电话：</view>
					<view class="rr">
						<input type="number" v-model="submitData.phone" placeholder="请输入联系方式" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">年龄：</view>
					<view class="rr styleLis pr" style="padding-right: 30rpx;">
						<view style="width: 100%; color: grey;font-size: 24rpx;text-align: right;">
							<picker @change="bindPickerChange" :value="index" :range="array" style="width: 100%;">
								<view class="uni-input">{{array[index]?array[index]:'请选择'}}</view>
							</picker>
						</view>
						<view class="arrow" style="position: absolute;top: 50%;right:0rpx; transform: translateY(-50%);">
							<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">身份证号：</view>
					<view class="rr">
						<input type="text" placeholder="请输入身份证号" v-model="submitData.description">
					</view>
				</view>
				
				<view class="submitbtn" style="margin: 200rpx auto">
					<button type="submit" @click="Utils.stopMultiClick(submit)">保存</button>
				</view>
			</form>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				score:'',
				wx_info:{},
				is_show:false,
				index: '',
				curr:1,
				array:['18','19','20','21','22'],
				submitData:{
					title:'',
					keywords:'',
					phone:'',
					score:'',
					description:'',
					type:7
				},
				Utils:this.$Utils
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			change(curr){
				const self=this
				if(curr!=self.submitData.keywords){
					self.submitData.keywords=curr
				}
			},
			
			bindPickerChange(e) {
				const self=this
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.index = e.target.value
				self.submitData.score = self.array[self.index]
			},
			
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
				postData.tokenFuncName = 'getThreeToken';
			
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('提交成功', 'none');
						self.submitData = {
							title:'',
							keywords:'',
							phone:'',
							score:'',
							description:'',
						};
						self.index = ''
						
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

<style>
	@import "../../assets/style/caseSbmit.css";


</style> 
